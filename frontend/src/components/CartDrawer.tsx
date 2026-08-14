'use client';

import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();

  const total = items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-60">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />

      {/* drawer */}
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#2a3c2e]">Tu carrito</h3>
          <button onClick={closeCart} aria-label="Cerrar carrito" className="p-2 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">Tu carrito está vacío.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-white rounded-2xl p-3 border shadow-sm">
                <div className="h-16 w-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {item.imagenUrl ? <img src={item.imagenUrl} alt={item.nombre} className="object-contain h-full w-full" /> : <div className="h-8 w-8 bg-gray-200 rounded" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{item.nombre}</div>
                  <div className="text-sm text-gray-600">${item.precio.toLocaleString('es-AR')}</div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-md hover:bg-gray-100"><Minus className="h-4 w-4" /></button>
                  <div className="px-2 text-sm font-bold">{item.cantidad}</div>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-md hover:bg-gray-100"><Plus className="h-4 w-4" /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="border-t pt-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Total estimado</div>
                <div className="text-lg font-extrabold text-[#2a3c2e]">${total.toLocaleString('es-AR')}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => { window.open(`https://wa.me/5493535635221?text=${encodeURIComponent('Hola, quiero hacer un pedido:')}`, '_blank'); }} className="bg-[#25D366] text-white px-4 py-2 rounded-lg font-bold">Pedir por WhatsApp</button>
                <button onClick={clearCart} className="text-sm text-red-500">Vaciar carrito</button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
