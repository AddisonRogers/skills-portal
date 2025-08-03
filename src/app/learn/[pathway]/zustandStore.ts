import { create } from "zustand";

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
	changesSubmitted: boolean;
	setChangesSubmitted: (changesSubmitted: boolean) => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
	editMode: false,
	setEditMode: (editMode) => set({ editMode }),
	changesSubmitted: false,
	setChangesSubmitted: (changesSubmitted) => set({ changesSubmitted }),
}));
