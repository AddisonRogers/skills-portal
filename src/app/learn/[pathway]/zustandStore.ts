import { create } from "zustand";
import {
	Node,
	Edge,
	NodeChange,
	EdgeChange,
	applyNodeChanges,
	applyEdgeChanges,
} from "@xyflow/react";

interface SelectedNodeState {
	selectedNode: string | null;
	setSelectedNode: (selectedNode: string | null) => void;
}

export const useSelectedNodeStore = create<SelectedNodeState>((set) => ({
	selectedNode: null,
	setSelectedNode: (selectedNode) => set({ selectedNode }),
}));

interface EditModeState {
	editMode: boolean;
	setEditMode: (editMode: boolean) => void;
	changedNodes: any[];
	setChangedNodes: (changedNodes: any[]) => void;
	changedEdges: any[];
	setChangedEdges: (changedEdges: any[]) => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
	editMode: false,
	setEditMode: (editMode) => set({ editMode }),
	changedNodes: [],
	setChangedNodes: (changedNodes) => set({ changedNodes }),
	changedEdges: [],
	setChangedEdges: (changedEdges) => set({ changedEdges }),
}));

interface FlowState {
	// Core data
	nodes: Node[];
	edges: Edge[];

	// Original state for comparison
	originalNodes: Node[];
	originalEdges: Edge[];

	// Change tracking
	changedNodeIds: Set<string>;
	changedEdgeIds: Set<string>;

	// Edit mode
	editMode: boolean;

	// Actions
	setNodes: (nodes: Node[] | ((prev: Node[]) => Node[])) => void;
	setEdges: (edges: Edge[] | ((prev: Edge[]) => Edge[])) => void;
	onNodesChange: (changes: NodeChange[]) => void;
	onEdgesChange: (changes: EdgeChange[]) => void;
	initializeFlow: (initialNodes: Node[], initialEdges: Edge[]) => void;
	setEditMode: (editMode: boolean) => void;

	// Getters for changed items
	getChangedNodes: () => Node[];
	getChangedEdges: () => Edge[];

	// Reset changes
	resetChanges: () => void;

	// Commit changes (make them the new original state)
	commitChanges: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
	// Initial state
	nodes: [],
	edges: [],
	originalNodes: [],
	originalEdges: [],
	changedNodeIds: new Set(),
	changedEdgeIds: new Set(),
	editMode: false,

	// Initialize with data from server
	initializeFlow: (initialNodes, initialEdges) =>
		set({
			nodes: initialNodes,
			edges: initialEdges,
			originalNodes: [...initialNodes],
			originalEdges: [...initialEdges],
			changedNodeIds: new Set(),
			changedEdgeIds: new Set(),
		}),

	// Set nodes (supports function updater)
	setNodes: (nodes) =>
		set((state) => {
			const newNodes = typeof nodes === "function" ? nodes(state.nodes) : nodes;
			return { nodes: newNodes };
		}),

	// Set edges (supports function updater)
	setEdges: (edges) =>
		set((state) => {
			const newEdges = typeof edges === "function" ? edges(state.edges) : edges;
			return { edges: newEdges };
		}),

	// Handle node changes from React Flow
	onNodesChange: (changes) =>
		set((state) => {
			const newNodes = applyNodeChanges(changes, state.nodes);
			const newChangedNodeIds = new Set(state.changedNodeIds);

			// Track which nodes changed
			changes.forEach((change) => {
				if (
					change.type === "position" ||
					change.type === "dimensions" ||
					change.type === "select"
				) {
					// Only track meaningful changes, not just selection
					if (change.type !== "select") {
						newChangedNodeIds.add(change.id);
					}
				} else if (change.type === "add") {
					// New nodes are automatically "changed"
					newChangedNodeIds.add(change.item.id);
				} else if (change.type === "remove") {
					// Remove from changed tracking if deleted
					newChangedNodeIds.delete(change.id);
				}
			});

			return {
				nodes: newNodes,
				changedNodeIds: newChangedNodeIds,
			};
		}),

	// Handle edge changes from React Flow
	onEdgesChange: (changes) =>
		set((state) => {
			const newEdges = applyEdgeChanges(changes, state.edges);
			const newChangedEdgeIds = new Set(state.changedEdgeIds);

			// Track which edges changed
			changes.forEach((change) => {
				if (change.type === "add") {
					newChangedEdgeIds.add(change.item.id);
				} else if (change.type === "remove") {
					newChangedEdgeIds.delete(change.id);
				} else if (change.type === "select") {
					// Don't track selection as a change
				}
			});

			return {
				edges: newEdges,
				changedEdgeIds: newChangedEdgeIds,
			};
		}),

	// Toggle edit mode
	setEditMode: (editMode) =>
		set((state) => {
			if (!editMode && state.editMode) {
				// Exiting edit mode - reset to original state
				return {
					editMode,
					nodes: [...state.originalNodes],
					edges: [...state.originalEdges],
					changedNodeIds: new Set(),
					changedEdgeIds: new Set(),
				};
			}
			return { editMode };
		}),

	// Get only the changed nodes
	getChangedNodes: () => {
		const { nodes, changedNodeIds } = get();
		return nodes.filter((node) => changedNodeIds.has(node.id));
	},

	// Get only the changed edges
	getChangedEdges: () => {
		const { edges, changedEdgeIds } = get();
		return edges.filter((edge) => changedEdgeIds.has(edge.id));
	},

	// Reset changes to original state
	resetChanges: () =>
		set((state) => ({
			nodes: [...state.originalNodes],
			edges: [...state.originalEdges],
			changedNodeIds: new Set(),
			changedEdgeIds: new Set(),
		})),

	// Commit current state as the new original (after successful save)
	commitChanges: () =>
		set((state) => ({
			originalNodes: [...state.nodes],
			originalEdges: [...state.edges],
			changedNodeIds: new Set(),
			changedEdgeIds: new Set(),
		})),
}));
