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

      {/* Floating Cart Button (replaces WhatsApp) */}
      {!isAdmin && (
        <motion.button
          onClick={openCart}
          className="fixed bottom-6 right-6 bg-[#324b3b] dark:bg-[#6ba368] text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center hover:scale-110 transition-transform"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
          aria-label="Abrir carrito"
          title="Abrir carrito"
        >
          <ShoppingCart className="h-6 w-6" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-[#b4483a] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center"
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
