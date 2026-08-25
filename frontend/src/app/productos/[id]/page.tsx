'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { catalogProducts, type CatalogProduct } from '../../../lib/catalog';
import { useCartStore } from '../../../store/cartStore';
import SmartImage from '../../../components/SmartImage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProductoDetallePage() {
  const params = useParams();
  const id = Number(params?.id ?? 0);
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState<CatalogProduct | null>(null);
  const [relacionados, setRelacionados] = useState<CatalogProduct[]>([]);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`${API_URL}/productos/${id}`, { signal: AbortSignal.timeout(6000) });
        if (!res.ok) throw new Error('No encontrado');
        const data = await res.json();
        setProducto(data || catalogProducts[0]);
        const productos = await fetch(`${API_URL}/productos`, { signal: AbortSignal.timeout(6000) }).then(r => r.ok ? r.json() : catalogProducts);
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
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7fa] dark:bg-[#0f172a] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#132a45] dark:text-[#67e8f9] mb-2">Producto no encontrado</h1>
          <Link href="/productos" className="text-[#154971] dark:text-[#22d3ee] font-semibold underline">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagenUrl: producto.imagenUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fa] dark:bg-[#0f172a] py-14">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link href="/productos" className="inline-flex items-center gap-2 text-[#154971] dark:text-[#22d3ee] font-semibold mb-8 hover:underline transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            className="bg-white dark:bg-[#1e293b] rounded-3xl border border-[#dce5ee] dark:border-gray-700 p-6 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="h-[420px] bg-[#f0f5f9] dark:bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden group">
              <SmartImage
                src={producto.imagenUrl || '/categorias/default.svg'}
                alt={producto.nombre}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#e0f7fa] dark:bg-[#155e75] text-[#0e7490] dark:text-[#22d3ee] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">{producto.categoria?.nombre || 'General'}</span>
              {producto.oferta && <span className="bg-[#fff1d8] dark:bg-[#4a3000] text-[#a56d00] dark:text-[#fbbf24] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide">Oferta</span>}
            </div>

            <h1 className="text-4xl font-extrabold text-[#132a45] dark:text-[#67e8f9] leading-tight mb-3">{producto.nombre}</h1>

            <div className="flex items-center gap-2 mb-4 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">4.9 · 128 opiniones</span>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-[#132a45] dark:text-[#22d3ee]">${Number(producto.precio).toLocaleString('es-AR')}</span>
              {producto.oferta && <span className="ml-3 text-lg line-through text-gray-400">${Number((Number(producto.precio) * 1.2).toFixed(0)).toLocaleString('es-AR')}</span>}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{producto.descripcion || 'Producto de calidad para tu día a día.'}</p>

            <div className="flex items-center gap-4 mb-8">
              <div className="inline-flex items-center border border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 overflow-hidden">
                <button onClick={() => setCantidad((value) => Math.max(1, value - 1))} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-12 text-center font-semibold">{cantidad}</span>
                <button onClick={() => setCantidad((value) => value + 1)} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 ${
                  added
                    ? 'bg-[#154971] text-white scale-[0.97]'
                    : 'bg-[#154971] hover:bg-[#0f3556] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white hover:shadow-lg'
                }`}
              >
                <ShoppingCart className={`h-4 w-4 ${added ? 'animate-bounce-subtle' : ''}`} />
                {added ? '¡AGREGADO!' : 'Agregar al carrito'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="bg-white dark:bg-[#1e293b] border border-[#dce5ee] dark:border-gray-700 rounded-xl p-3">
                <p className="font-semibold text-[#132a45] dark:text-gray-200">Stock</p>
                <p>{producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}</p>
              </div>
              <div className="bg-white dark:bg-[#1e293b] border border-[#dce5ee] dark:border-gray-700 rounded-xl p-3">
                <p className="font-semibold text-[#132a45] dark:text-gray-200">Entrega</p>
                <p>24hs</p>
              </div>
              <div className="bg-white dark:bg-[#1e293b] border border-[#dce5ee] dark:border-gray-700 rounded-xl p-3">
                <p className="font-semibold text-[#132a45] dark:text-gray-200">Pago</p>
                <p>WhatsApp</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-[#132a45] dark:text-[#67e8f9] mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {relacionados.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link href={`/productos/${item.id}`} className="block bg-white dark:bg-[#1e293b] rounded-2xl p-4 border border-[#dce5ee] dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="h-32 flex items-center justify-center mb-4">
                    <SmartImage src={item.imagenUrl || '/categorias/default.svg'} alt={item.nombre} className="h-full object-contain" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-[#0284c7] dark:text-[#22d3ee] mb-2">{item.categoria?.nombre || 'General'}</p>
                  <h3 className="font-bold text-[#132a45] dark:text-gray-100 mb-3">{item.nombre}</h3>
                  <span className="text-[#154971] dark:text-[#22d3ee] font-bold">${Number(item.precio).toLocaleString('es-AR')}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
