import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoritesState {
  ids: number[];
  alternar: (id: number) => void;
  esFavorito: (id: number) => boolean;
  limpiar: () => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      alternar: (id) =>
        set({
          ids: get().ids.includes(id)
            ? get().ids.filter((i) => i !== id)
            : [...get().ids, id],
        }),
      esFavorito: (id) => get().ids.includes(id),
      limpiar: () => set({ ids: [] }),
    }),
    {
      name: "pixtech-favoritos-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ ids: s.ids }) as FavoritesState,
    }
  )
);

export default useFavoritesStore;
