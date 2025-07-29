import { create } from "zustand";

interface SelectedNodeState {
	selectedNode: string | null;
	setSelectedNode: (selectedNode: string | null) => void;
}

export const useSelectedNodeStore = create<SelectedNodeState>((set) => ({
	selectedNode: null,
	setSelectedNode: (selectedNode) => set({ selectedNode }),
}));
