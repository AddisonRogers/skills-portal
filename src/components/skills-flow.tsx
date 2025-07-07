"use client"

import {useCallback, useState} from 'react';
import {ReactFlow, applyEdgeChanges, applyNodeChanges, MiniMap, Edge, Node} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

export default function SkillsFlow() {

  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);


  const nodeColor = (node) => {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}

        width={100}
        height={100}
      >
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable/>

      </ReactFlow>
    </div>

  );
}