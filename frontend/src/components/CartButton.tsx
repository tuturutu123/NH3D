'use client';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <button onClick={toggleCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors transform transition-transform duration-200 hover:-translate-y-1 hover:scale-105" aria-label="Abrir carrito">
      <ShoppingCart className="h-6 w-6 text-[#2a3c2e]" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-[#283d2d] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}