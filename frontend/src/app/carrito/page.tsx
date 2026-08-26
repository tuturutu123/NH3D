/* eslint-disable @next/next/no-img-element */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { buildWhatsAppUrl } from '../../lib/whatsapp';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const totalGeneral = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
        <div className="bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 p-6 rounded-2xl text-[#0891b2] dark:text-[#22d3ee] mb-4">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-2">Tu carrito está vacío</h2>
        <p className="text-[#71717a] dark:text-[#a1a1aa] mb-6 text-sm max-w-sm">
          Parece que aún no elegiste ningún producto. Explora nuestro catálogo y arma tu pedido.
        </p>
        <Link 
          href="/" 
          className="bg-[#0891b2] dark:bg-[#22d3ee] hover:bg-[#0e7490] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm shadow-md"
        >
          <ArrowLeft className="h-4 w-4" /> VOLVER AL INICIO
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] dark:bg-[#050505] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Carrito de Compras</h1>
          <Link href="/" className="text-sm font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0e7490] flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Seguir comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                >
                <div className="h-20 w-20 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center p-2">
                  {item.imagenUrl ? (
                    <img src={item.imagenUrl} alt={item.nombre} className="h-full w-full object-contain" />
                  ) : (
                    <ShoppingBag className="h-6 w-6 text-[#a1a1aa]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] text-sm truncate mb-1">{item.nombre}</h3>
                  <p className="text-sm font-bold text-[#0891b2] dark:text-[#22d3ee] font-mono">${item.precio.toLocaleString('es-AR')}</p>
                </div>

                <div className="flex items-center border border-black/[0.06] dark:border-white/[0.06] rounded-xl bg-[#f5f5f5] dark:bg-white/[0.03]">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.cantidad <= 1}
                    className="p-1.5 text-[#71717a] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-[#0a0a0a] dark:text-[#fafafa]">{item.cantidad}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 text-[#71717a] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-[#ef4444]/60 hover:text-[#ef4444] transition-colors rounded-lg hover:bg-[#ef4444]/10"
                  title="Eliminar producto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={clearCart} 
                className="text-xs font-semibold text-[#ef4444] hover:text-[#dc2626] transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 shadow-sm sticky top-28">
              <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 border-b border-black/[0.04] dark:border-white/[0.04] pb-3">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-[#71717a] dark:text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span className="font-mono">${totalGeneral.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-[#71717a] dark:text-[#a1a1aa]">
                  <span>Envíos a todo el país</span>
                  <span className="text-[#22c55e] dark:text-[#4ade80] font-medium">A coordinar</span>
                </div>
                <div className="border-t border-black/[0.04] dark:border-white/[0.04] pt-3 flex justify-between text-base font-extrabold text-[#0a0a0a] dark:text-[#fafafa]">
                  <span>Total</span>
                  <span className="text-[#0891b2] dark:text-[#22d3ee] font-mono">${totalGeneral.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <a
                href={buildWhatsAppUrl(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-900/10 flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle className="h-5 w-5" /> PEDIR POR WHATSAPP
              </a>
              
              <p className="text-[11px] text-center text-[#a1a1aa] mt-4">
                Al hacer clic serás redirigido a WhatsApp para enviar el detalle exacto de tu compra al vendedor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
