'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <button onClick={toggleCart} className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors" aria-label="Abrir carrito">
      <ShoppingCart className="h-6 w-6 text-[#2a3c2e] dark:text-[#6ba368]" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-[#283d2d] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#111827]">
          {totalItems}
        </span>
      )}
    </button>
  );
}
