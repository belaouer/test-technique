import { create } from "zustand";
import api from "@/lib/api";
import { List } from "@/types/list";

interface ListState {
  lists: List[];
  selectedListId: string | null;
  fetchLists: () => Promise<void>;
  createList: (name: string) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  setSelectedList: (id: string | null) => void;
  getSelectedList: () => List | null;
}

export const useLists = create<ListState>((set, get) => ({
  lists: [],
  selectedListId: null,

  fetchLists: async () => {
    const res = await api.get("/lists");
    set({ lists: res.data });
  },

  createList: async (name: string) => {
    try {
      const res = await api.post("/lists", { name });
      set((state) => ({
        lists: [...state.lists, res.data],
      }));
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("Une liste avec ce nom existe déjà.");
      } else {
        throw new Error("Erreur lors de la création de la liste.");
      }
    }
  },

  deleteList: async (id: string) => {
    await api.delete(`/lists/${id}`);
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
      selectedListId: state.selectedListId === id ? null : state.selectedListId,
    }));
  },

  setSelectedList: (id: string | null) => {
    set({ selectedListId: id });
  },

  getSelectedList: () => {
    const { lists, selectedListId } = get();
    console.log("selectedListId", selectedListId);

    return lists.find((list) => list.id === selectedListId) || null;
  },
}));
