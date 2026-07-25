"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Product } from "@/types";
import { products } from "@/data/products";

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialLines: CartLine[] = [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(initialLines);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.product.id === productId
          ? { ...l, quantity: Math.max(1, l.quantity + delta) }
          : l
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [
      lines,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
