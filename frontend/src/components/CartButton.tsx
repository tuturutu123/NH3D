'use client';

import { useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartButton() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const prevCount = useRef(totalItems);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (totalItems > prevCount.current && badgeRef.current) {
      badgeRef.current.classList.remove('animate-pulse-cart');
      void badgeRef.current.offsetWidth;
      badgeRef.current.classList.add('animate-pulse-cart');
    }
    prevCount.current = totalItems;
  }, [totalItems]);

  return (
    <button onClick={toggleCart} className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors" aria-label="Abrir carrito">
      <ShoppingCart className="h-6 w-6 text-[#2a3c2e] dark:text-[#6ba368]" />
      {totalItems > 0 && (
        <span
          ref={badgeRef}
          className="absolute top-0 right-0 bg-[#b4483a] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#111827] animate-bounce-subtle"
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
