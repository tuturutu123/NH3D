'use client';

import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { catalogProducts } from '../../../lib/catalog';
import { useCartStore } from '../../../store/cartStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProductoDetallePage() {
  const params = useParams();
  const id = Number(params?.id ?? 0);
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState<any | null>(null);
  const [relacionados, setRelacionados] = useState<any[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error('No encontrado');
        const data = await res.json();
        setProducto(data || catalogProducts[0]);
        const productos = await fetch(`${API_URL}/productos`).then(r => r.ok ? r.json() : catalogProducts);
        setRelacionados((Array.isArray(productos) ? productos : catalogProducts).filter((item) => item.id !== data?.id).slice(0, 4));
      } catch {
        const fallback = catalogProducts.find((item) => item.id === id) || catalogProducts[0];
        setProducto(fallback);
        setRelacionados(catalogProducts.filter((item) => item.id !== fallback.id).slice(0, 4));
      }
    };
    void cargar();
  }, [id]);

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2a3c2e] mb-2">Producto no encontrado</h1>
          <Link href="/productos" className="text-[#324b3b] font-semibold underline">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-14">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link href="/productos" className="inline-flex items-center gap-2 text-[#324b3b] font-semibold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-3xl border border-[#eae4d7] p-6 shadow-sm">
            <div className="h-[420px] bg-[#f8f5f0] rounded-2xl flex items-center justify-center overflow-hidden">
              {producto.imagenUrl ? (
                <img src={producto.imagenUrl} alt={producto.nombre} className="max-h-full object-contain" />
              ) : (
                <div className="text-gray-400">Sin imagen</div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#eef6ec] text-[#2d6c43] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">{producto.categoria?.nombre || 'General'}</span>
              {producto.oferta && <span className="bg-[#fff1d8] text-[#a56d00] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">Oferta</span>}
            </div>

            <h1 className="text-4xl font-extrabold text-[#2a3c2e] leading-tight mb-3">{producto.nombre}</h1>

            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm text-gray-500 ml-2">4.9 · 128 opiniones</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-[#2a3c2e]">${Number(producto.precio).toLocaleString('es-AR')}</span>
              {producto.oferta && <span className="ml-3 text-lg line-through text-gray-400">${Number((Number(producto.precio) * 1.2).toFixed(0)).toLocaleString('es-AR')}</span>}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">{producto.descripcion || 'Producto de calidad para tu día a día.'}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="inline-flex items-center border border-gray-200 rounded-full bg-white overflow-hidden">
                <button onClick={() => setCantidad((value) => Math.max(1, value - 1))} className="p-3 hover:bg-gray-50">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-12 text-center font-semibold">{cantidad}</span>
                <button onClick={() => setCantidad((value) => value + 1)} className="p-3 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={() => addItem({
                  id: producto.id,
                  nombre: producto.nombre,
                  precio: Number(producto.precio),
                  imagenUrl: producto.imagenUrl,
                })}
                className="flex-1 bg-[#324b3b] hover:bg-[#24382d] text-white py-3.5 rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" /> Agregar al carrito
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="bg-white border border-[#eae4d7] rounded-xl p-3">
                <p className="font-semibold text-[#2a3c2e]">Stock</p>
                <p>{producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}</p>
              </div>
              <div className="bg-white border border-[#eae4d7] rounded-xl p-3">
                <p className="font-semibold text-[#2a3c2e]">Entrega</p>
                <p>24hs</p>
              </div>
              <div className="bg-white border border-[#eae4d7] rounded-xl p-3">
                <p className="font-semibold text-[#2a3c2e]">Pago</p>
                <p>WhatsApp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#2a3c2e] mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {relacionados.map((item) => (
              <Link key={item.id} href={`/productos/${item.id}`} className="bg-white rounded-2xl p-4 border border-[#ece7dc] hover:shadow-md transition-shadow">
                <div className="h-32 flex items-center justify-center mb-4">
                  {item.imagenUrl ? <img src={item.imagenUrl} alt={item.nombre} className="h-full object-contain" /> : null}
                </div>
                <p className="text-xs uppercase tracking-wide text-[#6c7b69] mb-2">{item.categoria?.nombre || 'General'}</p>
                <h3 className="font-bold text-[#2a3c2e] mb-3">{item.nombre}</h3>
                <span className="text-[#324b3b] font-bold">${Number(item.precio).toLocaleString('es-AR')}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
