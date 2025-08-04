"use client";

import {useCallback, useMemo, useState} from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Edge,
  Connection,
  useReactFlow,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {NodeBase} from "@xyflow/system";
import {SkillNode} from "./nodes/SkillNode";
import dagre from "@dagrejs/dagre";
import {
  useEditModeStore,
  useFlowStore,
  useSelectedNodeStore,
} from "@/app/learn/[pathway]/zustandStore";
import {AddSkillModal} from "@/components/AddSkillModal";

export default function SkillsFlow() {
  const reactFlowInstance = useReactFlow();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);

  // Get everything from the flow store
  const {
    nodes,
    edges,
    editMode,
    setEdges,
    setNodes,
    onNodesChange,
    onEdgesChange,
  } = useFlowStore();

  const nodeTypes = {
    skill: SkillNode,
  };

	const onConnect = useCallback(
		(params) => {
			if (editMode) {
				setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
			}
		},
		[editMode, setEdges],
	);

  // Generate a unique ID for new nodes
  const getId = () => {
    return `node_${nodes.length + 1}_${Date.now()}`;
  };

  // Generate a placeholder blob URL for new nodes
  const generateBlobUrl = (skillName: string) => {
    const skillSlug = skillName.toLowerCase().replace(/\s+/g, "-");
    return `https://skillsportalblobs.blob.core.windows.net/skills/skills/${skillSlug}.json`;
  };


  // Handle right-click to add a new node
  const handleAddSkill = useCallback(
    (skillData: { name: string; description: string; type: string }) => {
      if (!pendingPosition) return;

      const newNode = {
        id: getId(),
        type: "skill",
        position: pendingPosition,
        data: {
          name: skillData.name,
          description: skillData.description,
          type: skillData.type,
          blobUrl: generateBlobUrl(skillData.name),
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setPendingPosition(null);
    },
    [pendingPosition, setNodes],
  );

  const onPaneContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      if (!editMode) return;

      // Get the position where the right-click occurred
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setPendingPosition(position);
      setIsModalOpen(true);
    },
    [editMode, reactFlowInstance],
  );


  return (
    <>
      <div
        style={{height: "99vh", width: "99vw"}}
        className={"flex justify-center px-4 "}
      >
        <ReactFlow
          key={nodes.length}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onPaneContextMenu={onPaneContextMenu}
          fitView={true}
          nodeTypes={nodeTypes}
          connectionLineType={ConnectionLineType.SmoothStep}
          deleteKeyCode={editMode ? "Delete" : null}
          selectionKeyCode={editMode ? "Shift" : null}
          multiSelectionKeyCode={editMode ? "Control" : null}
          zoomOnScroll={!editMode}
          panOnScroll={!editMode}
          selectionOnDrag={editMode}
          panOnDrag={!editMode}
          elementsSelectable={editMode}
          nodesConnectable={editMode}
          nodesDraggable={editMode}
        >
          <Panel position="top-right" className="bg-white p-2 rounded shadow-md">
            {editMode ? (
              <div className="text-xs text-gray-700">
                <p>• Right-click to add a node</p>
                <p>• Drag between nodes to connect</p>
                <p>• Press Delete to remove selected</p>
              </div>
            ) : null}
          </Panel>
        </ReactFlow>
      </div>
      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPendingPosition(null);
        }}
        onAddSkill={handleAddSkill}
      />
    </>
  );
}
