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
    <div className="min-h-screen bg-[#faf9f6] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#627653] font-semibold">Promociones</p>
            <h1 className="text-4xl font-extrabold text-[#2a3c2e]">Ofertas del mes</h1>
          </div>
          <Link href="/productos" className="inline-flex items-center gap-2 text-[#324b3b] font-semibold hover:underline">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {ofertas.map((producto) => (
            <div key={producto.id} className="bg-white rounded-2xl border border-[#ece7dc] p-4 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#eef6ec] text-[#2d6c43] px-2 py-1 rounded-full text-[10px] font-bold uppercase">Oferta</span>
                <span className="text-[#7e6f5f] text-xs font-medium">{producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}</span>
              </div>

              <div className="h-36 flex items-center justify-center mb-4 rounded-xl bg-[#f6f4ef]">
                {producto.imagenUrl ? (
                  <img src={producto.imagenUrl} alt={producto.nombre} className="h-full w-full object-contain p-3" />
                ) : (
                  <div className="text-sm text-gray-400">Sin imagen</div>
                )}
              </div>

              <p className="text-xs uppercase tracking-wide text-[#6c7b69] mb-2">{producto.categoria?.nombre}</p>
              <h2 className="text-lg font-bold text-[#273d2f] mb-2 line-clamp-2">{producto.nombre}</h2>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-extrabold text-[#2a3c2e]">${Number(producto.precio).toLocaleString('es-AR')}</span>
                <span className="text-sm line-through text-gray-400">${Number((Number(producto.precio) * 1.22).toFixed(0)).toLocaleString('es-AR')}</span>
              </div>

              <Link href={`/productos/${producto.id}`} className="inline-flex items-center gap-2 bg-[#324b3b] hover:bg-[#253a2d] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors">
                Ver producto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#f1efe8] rounded-2xl p-6 border border-[#e8e2d8]">
            <Truck className="h-8 w-8 text-[#324b3b] mb-3" />
            <h3 className="text-xl font-bold text-[#2a3c2e] mb-2">Envíos rápidos</h3>
            <p className="text-gray-600">Pedidos a Villa Mercedes y zonas cercanas en tiempo récord.</p>
          </div>
          <div className="bg-[#f1efe8] rounded-2xl p-6 border border-[#e8e2d8]">
            <ShieldCheck className="h-8 w-8 text-[#324b3b] mb-3" />
            <h3 className="text-xl font-bold text-[#2a3c2e] mb-2">Compra segura</h3>
            <p className="text-gray-600">Protegemos tus pagos y entregas con atención personalizada.</p>
          </div>
          <div className="bg-[#f1efe8] rounded-2xl p-6 border border-[#e8e2d8]">
            <Percent className="h-8 w-8 text-[#324b3b] mb-3" />
            <h3 className="text-xl font-bold text-[#2a3c2e] mb-2">Promos exclusivas</h3>
            <p className="text-gray-600">Accedé a descuentos para mates, snacks y productos de temporada.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
