import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/data/catalog";
import { priceOf } from "@/data/catalog";

export interface CartItem extends Product {
  cantidad: number;
}

interface CartState {
  carrito: CartItem[];
  isCartOpen: boolean;
  abrirCarrito: () => void;
  cerrarCarrito: () => void;
  agregarAlCarrito: (producto: Product) => void;
  eliminarDelCarrito: (id: number) => void;
  aumentarCantidad: (id: number) => void;
  disminuirCantidad: (id: number) => void;
  vaciarCarrito: () => void;
  getCantidadTotal: () => number;
  getTotal: () => number;
}

// Equivalente a hefestotech cartStore.js, adaptado a PixTech (mismo API).
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carrito: [],
      isCartOpen: false,
      abrirCarrito: () => set({ isCartOpen: true }),
      cerrarCarrito: () => set({ isCartOpen: false }),
      agregarAlCarrito: (producto) => {
        const actual = get().carrito;
        const existe = actual.find((i) => i.id === producto.id);
        if (existe) {
          set({
            carrito: actual.map((i) =>
              i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
            ),
          });
        } else {
          set({ carrito: [...actual, { ...producto, cantidad: 1 }] });
        }
        set({ isCartOpen: true });
      },
      eliminarDelCarrito: (id) =>
        set({ carrito: get().carrito.filter((i) => i.id !== id) }),
      aumentarCantidad: (id) =>
        set({
          carrito: get().carrito.map((i) =>
            i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i
          ),
        }),
      disminuirCantidad: (id) =>
        set({
          carrito: get().carrito.map((i) =>
            i.id === id && i.cantidad > 1 ? { ...i, cantidad: i.cantidad - 1 } : i
          ),
        }),
      vaciarCarrito: () => set({ carrito: [] }),
      getCantidadTotal: () =>
        get().carrito.reduce((acc, i) => acc + i.cantidad, 0),
      getTotal: () =>
        get().carrito.reduce((acc, i) => acc + priceOf(i) * i.cantidad, 0),
    }),
    {
      name: "pixtech-carrito",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ carrito: s.carrito }) as CartState,
    }
  )
);

export default useCartStore;
