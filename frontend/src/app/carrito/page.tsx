/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useCartStore } from '../../store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();

  const totalGeneral = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let mensaje = "Hola! 🌿 Vengo de *Natura Tienda de Productos* y quiero realizar el siguiente pedido:\n\n";
    items.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.nombre}* x${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n`;
    });
    mensaje += `\n*TOTAL A PAGAR: $${totalGeneral.toLocaleString('es-AR')}*`;
    mensaje += `\n\nQuedo a la espera de la coordinación del pago y envío en Villa Mercedes. ¡Gracias!`;

    const telefono = "5493535635221";
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
        <div className="bg-[#f5f4ef] dark:bg-[#1e293b] p-6 rounded-full text-[#324b3b] dark:text-[#6ba368] mb-4">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-[#2a3c2e] dark:text-[#a8d5a2] mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm max-w-sm">
          Parece que aún no elegiste ningún producto. Explora nuestro catálogo y arma tu pedido.
        </p>
        <Link 
          href="/" 
          className="bg-[#324b3b] dark:bg-[#6ba368] hover:bg-[#233328] dark:hover:bg-[#5a9455] text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2 text-sm shadow-md"
        >
          <ArrowLeft className="h-4 w-4" /> VOLVER AL INICIO
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f6] dark:bg-[#0f172a] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-[#2a3c2e] dark:text-[#a8d5a2] tracking-tight">Carrito de Compras</h1>
          <Link href="/" className="text-sm font-semibold text-[#627653] dark:text-[#6ba368] hover:text-[#2a3c2e] flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Seguir comprando
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#1e293b] border border-[#eae6db] dark:border-gray-700 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                <div className="h-20 w-20 rounded-xl bg-[#fcfbf9] dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden shrink-0 flex items-center justify-center p-2">
                  {item.imagenUrl ? (
                    <img src={item.imagenUrl} alt={item.nombre} className="h-full w-full object-contain" />
                  ) : (
                    <ShoppingBag className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate mb-1">{item.nombre}</h3>
                  <p className="text-sm font-bold text-[#2a3c2e] dark:text-[#6ba368]">${item.precio.toLocaleString('es-AR')}</p>
                </div>

                <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.cantidad <= 1}
                    className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white transition-colors disabled:opacity-30"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-gray-800 dark:text-gray-200">{item.cantidad}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                  title="Eliminar producto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={clearCart} 
                className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1e293b] border border-[#eae6db] dark:border-gray-700 rounded-2xl p-6 shadow-sm sticky top-28">
              <h2 className="text-lg font-bold text-[#2a3c2e] dark:text-[#a8d5a2] mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${totalGeneral.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío en Villa Mercedes</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">A coordinar</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between text-base font-extrabold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span className="text-[#2a3c2e] dark:text-[#6ba368]">${totalGeneral.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-green-900/10 flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <MessageCircle className="h-5 w-5" /> PEDIR POR WHATSAPP
              </button>
              
              <p className="text-[11px] text-center text-gray-400 mt-4">
                Al hacer clic serás redirigido a WhatsApp para enviar el detalle exacto de tu compra al vendedor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
