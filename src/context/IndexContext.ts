"use client";
import { create } from "zustand";

type ZustandStore = {
  IDs: string[];
  addFile: (fileId: string) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
};

export const useIndexStore = create<ZustandStore>((set) => ({
  IDs: [],
  addFile: (fileId: string) =>
    set((state) => ({ IDs: [...state.IDs, fileId] })),
  removeFile: (fileId: string) =>
    set((state) => ({ IDs: state.IDs.filter((f) => f !== fileId) })),
  clearFiles: () => set({ IDs: [] }),
}));
