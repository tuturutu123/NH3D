'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { buildWhatsAppUrl } from '../lib/whatsapp';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-60">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-[#1e293b] shadow-2xl p-6 overflow-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#2a3c2e] dark:text-[#6ba368]">Tu carrito</h3>
              <button onClick={closeCart} aria-label="Cerrar carrito" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-12">Tu carrito está vacío.</div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="flex items-center gap-3 bg-white dark:bg-[#0f172a] rounded-2xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm"
                    >
                      <div className="h-16 w-16 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                        {item.imagenUrl ? (
                          <img src={item.imagenUrl} alt={item.nombre} className="object-contain h-full w-full" loading="lazy" />
                        ) : (
                          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{item.nombre}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">${item.precio.toLocaleString('es-AR')}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Minus className="h-4 w-4" /></button>
                        <div className="px-2 text-sm font-bold">{item.cantidad}</div>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Plus className="h-4 w-4" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total estimado</div>
                    <div className="text-lg font-extrabold text-[#2a3c2e] dark:text-[#6ba368]">${total.toLocaleString('es-AR')}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={buildWhatsAppUrl(items)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" /> Pedir por WhatsApp
                    </a>
                    <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition-colors">Vaciar carrito</button>
                  </div>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
