"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type KBStore = {
  knowledge_base_id: string;
  setKnowledgeBaseId: (id: string) => void;
};

export const useKBStore = create(
  persist<KBStore>(
    (set) => ({
      knowledge_base_id: "",
      setKnowledgeBaseId: (id: string) => set({ knowledge_base_id: id }),
    }),
    {
      name: "KBStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
