'use client';

import Link from 'next/link';
import { ArrowRight, Percent, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { catalogProducts, type CatalogProduct } from '../../lib/catalog';
import SmartImage from '../../components/SmartImage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function OfertasPage() {
  const [ofertas, setOfertas] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/productos`, { signal: AbortSignal.timeout(6000) });
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1">Promociones</p>
            <h1 className="text-4xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Ofertas del mes</h1>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-2 text-[#0891b2] dark:text-[#22d3ee] font-semibold hover:gap-3 transition-all duration-300">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {ofertas.map((producto) => (
            <div key={producto.id} className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] p-4 hover:shadow-md hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] px-2 py-1 rounded-lg text-[10px] font-bold uppercase font-mono tracking-wide border border-[#0891b2]/20 dark:border-[#22d3ee]/20">Oferta</span>
                <span className="text-[#71717a] dark:text-[#52525b] text-xs font-medium">{producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}</span>
              </div>

              <div className="h-36 flex items-center justify-center mb-4 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.03] overflow-hidden group">
                <SmartImage
                  src={producto.imagenUrl || '/categorias/default.svg'}
                  alt={producto.nombre}
                  className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="text-xs uppercase tracking-wide text-[#0891b2] dark:text-[#22d3ee] mb-2 font-mono">{producto.categoria?.nombre}</p>
              <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-2 line-clamp-2">{producto.nombre}</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-extrabold text-[#0891b2] dark:text-[#22d3ee] font-mono">${Number(producto.precio).toLocaleString('es-AR')}</span>
                <span className="text-sm line-through text-[#a1a1aa]">${Number((Number(producto.precio) * 1.22).toFixed(0)).toLocaleString('es-AR')}</span>
              </div>

              <Link href={`/productos/${producto.id}`} className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300">
                Ver producto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Truck, title: 'Envíos a todo el país', desc: 'Despachamos tu pedido desde Villa María, Córdoba a donde estés.' },
            { icon: ShieldCheck, title: 'Compra segura', desc: 'Protegemos tus pagos y entregas con atención personalizada.' },
            { icon: Percent, title: 'Promos exclusivas', desc: 'Descuentos en llaveros, mates, figuras flexi y combos para regalar.' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-6 border border-black/[0.06] dark:border-white/[0.06] hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
              <item.icon className="h-8 w-8 text-[#0891b2] dark:text-[#22d3ee] mb-3" />
              <h3 className="text-xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-2">{item.title}</h3>
              <p className="text-[#71717a] dark:text-[#a1a1aa]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
