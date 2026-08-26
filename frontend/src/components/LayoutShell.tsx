"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { useCartStore } from '../store/cartStore';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      {!isAdmin && <Navbar />}

      <main className="grow">{children}</main>

      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}

      {/* Floating Cart Button */}
      {!isAdmin && (
        <motion.button
          onClick={openCart}
          className="fixed bottom-6 right-6 bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505] w-14 h-14 rounded-2xl shadow-[0_4px_20px_-2px_rgba(8,145,178,0.4)] dark:shadow-[0_4px_20px_-2px_rgba(34,211,238,0.3)] z-50 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
          aria-label="Abrir carrito"
          title="Abrir carrito"
        >
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5 bg-[#ef4444] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center font-mono"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </>
  );
}
