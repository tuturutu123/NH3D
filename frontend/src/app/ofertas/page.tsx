'use client';

import Link from 'next/link';
import { ArrowRight, Percent, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { catalogProducts } from '../../lib/catalog';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState<any[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`);
        if (!res.ok) throw new Error('No se pudo cargar');
        const data = await res.json();
        setOfertas((Array.isArray(data) ? data : catalogProducts).filter((p) => p.oferta || p.destacado).slice(0, 8));
      } catch {
        setOfertas(catalogProducts.filter((p) => p.oferta || p.destacado).slice(0, 8));
      }
    };
    void cargar();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f7fa] dark:bg-[#0f172a] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#0369a1] dark:text-[#22d3ee] font-semibold">Promociones</p>
            <h1 className="text-4xl font-extrabold text-[#132a45] dark:text-[#67e8f9]">Ofertas del mes</h1>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-2 text-[#154971] dark:text-[#22d3ee] font-semibold hover:underline">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {ofertas.map((producto) => (
            <div key={producto.id} className="bg-white dark:bg-[#1e293b] rounded-2xl border border-[#dce5ee] dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#e0f7fa] dark:bg-[#155e75] text-[#0e7490] dark:text-[#22d3ee] px-2 py-1 rounded-full text-[10px] font-bold uppercase">Oferta</span>
                <span className="text-[#0ea5e9] dark:text-gray-400 text-xs font-medium">{producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}</span>
              </div>

              <div className="h-36 flex items-center justify-center mb-4 rounded-xl bg-[#f0f5f9] dark:bg-gray-800">
                {producto.imagenUrl ? (
                  <img src={producto.imagenUrl} alt={producto.nombre} className="h-full w-full object-contain p-3" />
                ) : (
                  <div className="text-sm text-gray-400">Sin imagen</div>
                )}
              </div>

              <p className="text-xs uppercase tracking-wide text-[#0284c7] dark:text-[#22d3ee] mb-2">{producto.categoria?.nombre}</p>
              <h2 className="text-lg font-bold text-[#132a45] dark:text-gray-100 mb-2 line-clamp-2">{producto.nombre}</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-extrabold text-[#132a45] dark:text-[#22d3ee]">${Number(producto.precio).toLocaleString('es-AR')}</span>
                <span className="text-sm line-through text-gray-400">${Number((Number(producto.precio) * 1.22).toFixed(0)).toLocaleString('es-AR')}</span>
              </div>

              <Link href={`/productos/${producto.id}`} className="inline-flex items-center gap-2 bg-[#154971] hover:bg-[#0f3556] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
                Ver producto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#ecf2f7] dark:bg-[#1e293b] rounded-2xl p-6 border border-[#dce5ee] dark:border-gray-700">
            <Truck className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
            <h3 className="text-xl font-bold text-[#132a45] dark:text-gray-100 mb-2">Envíos a todo el país</h3>
            <p className="text-gray-600 dark:text-gray-400">Despachamos tu pedido desde Villa María, Córdoba a donde estés.</p>
          </div>
          <div className="bg-[#ecf2f7] dark:bg-[#1e293b] rounded-2xl p-6 border border-[#dce5ee] dark:border-gray-700">
            <ShieldCheck className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
            <h3 className="text-xl font-bold text-[#132a45] dark:text-gray-100 mb-2">Compra segura</h3>
            <p className="text-gray-600 dark:text-gray-400">Protegemos tus pagos y entregas con atención personalizada.</p>
          </div>
          <div className="bg-[#ecf2f7] dark:bg-[#1e293b] rounded-2xl p-6 border border-[#dce5ee] dark:border-gray-700">
            <Percent className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
            <h3 className="text-xl font-bold text-[#132a45] dark:text-gray-100 mb-2">Promos exclusivas</h3>
            <p className="text-gray-600 dark:text-gray-400">Descuentos en llaveros, mates, figuras flexi y combos para regalar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
