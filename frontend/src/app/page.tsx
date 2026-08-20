/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import { catalogProducts, catalogCategories } from '../lib/catalog';
import { useCartStore } from '../store/cartStore';
import { MapPin, Phone, ShieldCheck, ShoppingCart, Truck, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ProductCarousel from '../components/ProductCarousel';

interface Categoria { id: number; nombre: string; }
interface Producto {
  id: number; nombre: string; precio: number; stock: number;
  estado: boolean; destacado: boolean; oferta: boolean;
  imagenUrl: string | null; categoriaId: number; categoria?: Categoria;
}

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProductos, resCategorias] = await Promise.all([api.get('/productos'), api.get('/categorias')]);
        const prod = Array.isArray(resProductos.data) ? resProductos.data : catalogProducts;
        const cat = Array.isArray(resCategorias.data) ? resCategorias.data : catalogCategories;
        setProductos(prod.filter((p: Producto) => p.estado));
        setCategorias(cat);
      } catch {
        setProductos(catalogProducts.filter(p => p.estado));
        setCategorias(catalogCategories);
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#0f172a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#324b3b]"></div>
      </div>
    );
  }

  const productosDestacados = productos.filter(p => p.destacado).slice(0, 10);
  const todosLosProductos = productos.slice(0, 10);

  const getCategoriaImagen = (nombre: string) => {
    const nombreNormalizado = nombre.toLowerCase();
    const mapaImagenes: Record<string, string> = {
      'mates y accesorios': '/categorias/mates.png',
      'yerbas': '/categorias/yerba.png',
      'snacks y golosinas': '/categorias/snacks.png',
      'snacks': '/categorias/snacks.png',
      'bebidas': '/categorias/default.svg',
      'comidas': '/categorias/default.svg',
      'termos y botellas': '/categorias/default.svg',
      'semillas y frutos secos': '/categorias/default.svg',
      'condimentos y especias': '/categorias/default.svg',
      'bombillas y repuestos': '/categorias/default.svg',
      'vasos y tazas': '/categorias/default.svg',
    };
    return mapaImagenes[nombreNormalizado] || '/categorias/default.svg';
  };

  return (
    <div className="bg-[#faf9f6] dark:bg-[#0f172a] min-h-screen">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative py-12 md:py-32 overflow-hidden border-b border-[#e5e2d6] dark:border-gray-800">
        <div className="absolute inset-0 z-0">
          <Image src="/portada.png" alt="Portada" fill className="object-cover object-center md:object-right pointer-events-none select-none" priority />
        </div>
        <div className="absolute inset-0 z-10 bg-linear-to-r from-white/80 via-white/50 to-transparent dark:from-[#0f172a]/90 dark:via-[#0f172a]/60" />

        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#2a3c2e] dark:text-[#a8d5a2] leading-[1.05] mb-6 tracking-tight">
              Todo lo que<br />te gusta, en un<br />solo lugar.
            </h1>
            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-300 mb-8 font-medium max-w-md">
              Mates, yerbas, comidas, snacks, bebidas, accesorios y mucho más.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-6 rounded-full text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 w-full sm:w-auto hover:shadow-xl hover:shadow-green-900/30 hover:scale-[1.02]">
                <Phone className="h-5 w-5" /> PEDIR POR WHATSAPP
              </a>
              <Link href="/productos"
                className="border-2 border-[#2a3c2e] dark:border-[#6ba368] bg-[#e5e3d9]/50 dark:bg-gray-800/50 backdrop-blur-sm text-[#2a3c2e] dark:text-[#6ba368] hover:bg-[#2a3c2e] hover:text-white dark:hover:bg-[#6ba368] dark:hover:text-[#0f172a] font-bold py-3.5 px-8 rounded-full text-center transition-all duration-300 w-full sm:w-auto hover:scale-[1.02]">
                VER PRODUCTOS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Bar ─────────────────────────────────────── */}
      <ScrollReveal>
        <section className="bg-white dark:bg-[#111827] py-6 border-b border-[#e5e2d6] dark:border-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              <motion.div className="flex items-center gap-3 stagger-1" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Truck className="h-5 w-5 text-[#7d6f5f] dark:text-[#6ba368]" />
                <span>Envíos rápidos<br /><span className="text-xs text-gray-500 font-normal">en Villa Mercedes</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-2" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <ShieldCheck className="h-6 w-6 text-[#7d6f5f] dark:text-[#6ba368]" />
                <span>Pagos seguros<br /><span className="text-xs text-gray-500 font-normal">y protegidos</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-3" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Star className="h-6 w-6 text-[#7d6f5f] dark:text-[#6ba368]" />
                <span>Productos<br /><span className="text-xs text-gray-500 font-normal">de calidad</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-4" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Phone className="h-6 w-6 text-[#7d6f5f] dark:text-[#6ba368]" />
                <span>Atención<br /><span className="text-xs text-gray-500 font-normal">personalizada</span></span>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Categorías ──────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xl font-bold text-[#2a3c2e] dark:text-[#a8d5a2] uppercase tracking-wide">Categorías</h2>
              <Link href="/productos" className="text-sm font-bold text-[#627653] dark:text-[#6ba368] hover:text-[#2a3c2e] flex items-center gap-1 transition-colors">
                VER TODAS <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:flex sm:overflow-x-auto pb-4 gap-4 hide-scrollbar">
              {categorias.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="flex flex-col items-center gap-3 min-w-25 group"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 border border-[#e5e2d6] dark:border-gray-700 shadow-sm flex items-center justify-center p-3 group-hover:border-[#324b3b] dark:group-hover:border-[#6ba368] transition-all duration-300 overflow-hidden group-hover:shadow-md">
                    <img
                      src={getCategoriaImagen(cat.nombre)}
                      alt={cat.nombre}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/categorias/default.svg'; }}
                    />
                  </div>
                  <span className="font-semibold text-xs text-center text-gray-800 dark:text-gray-300 leading-tight w-20">{cat.nombre}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Ofertas Destacadas ───────────────────────────────── */}
      <ScrollReveal>
        <section className="py-8" id="ofertas">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-bold text-[#2a3c2e] dark:text-[#a8d5a2] uppercase tracking-wide">Ofertas Destacadas</h2>
              <Link href="/productos" className="text-sm font-bold text-[#627653] dark:text-[#6ba368] hover:text-[#2a3c2e] flex items-center gap-1">VER TODAS <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Combo\nMateador', sub: 'Mate + Yerba + Bombilla', price: '$15.990', bg: 'bg-[#5a6b5a] dark:bg-[#2d4a35]', text: 'text-white', priceColor: '' },
                { title: '2 Yerbas\nCBSé 500g', sub: 'Tradicional o Silueta', price: '$7.990', bg: 'bg-[#f0ece1] dark:bg-[#1e293b]', text: 'text-[#2a3c2e] dark:text-gray-100', priceColor: 'text-[#b4483a]', border: 'border border-[#e5e2d6] dark:border-gray-700' },
                { title: 'Termo\nStanley 1L', sub: 'Clásico verde', price: '$32.990', bg: 'bg-[#f8f4e6] dark:bg-[#1e293b]', text: 'text-[#2a3c2e] dark:text-gray-100', priceColor: '', border: 'border border-[#e5e2d6] dark:border-gray-700' },
                { title: 'Snacks\nFavoritos', sub: 'Llevando 3 pagás 2', price: '-33% OFF', bg: 'bg-[#f7eedd] dark:bg-[#1e293b]', text: 'text-[#2a3c2e] dark:text-gray-100', priceColor: 'text-[#b4483a]', border: 'border border-[#e5e2d6] dark:border-gray-700' },
              ].map((oferta, i) => (
                <motion.div
                  key={i}
                  className={`${oferta.bg} ${oferta.text} ${oferta.border || ''} rounded-2xl p-6 relative overflow-hidden h-48 flex flex-col justify-center cursor-default`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <h3 className="font-bold text-xl uppercase leading-tight mb-1 whitespace-pre-line">{oferta.title}</h3>
                  <p className="text-xs opacity-90 mb-3">{oferta.sub}</p>
                  <p className={`font-bold text-2xl ${oferta.priceColor}`}>{oferta.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Productos Destacados (Carrusel infinito) ──────────── */}
      {productosDestacados.length > 0 && (
        <ScrollReveal>
          <section className="py-12" id="productos">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-xl font-bold text-[#2a3c2e] dark:text-[#a8d5a2] uppercase tracking-wide">Productos Destacados</h2>
                <Link href="/productos" className="text-sm font-bold text-[#627653] dark:text-[#6ba368] hover:text-[#2a3c2e] flex items-center gap-1">VER TODOS <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ProductCarousel>
              {[...productosDestacados, ...productosDestacados].map((producto, i) => (
                <div key={`${producto.id}-${i}`} className="w-[200px] sm:w-[220px] md:w-[240px] shrink-0">
                  <ProductoCard producto={producto} backendUrl={backendUrl} onAdd={addItem} />
                </div>
              ))}
            </ProductCarousel>
          </section>
        </ScrollReveal>
      )}

      {/* ── Todos los Productos ──────────────────────────────── */}
      <ScrollReveal>
        <section className="py-12 bg-white dark:bg-[#111827] border-t border-[#e5e2d6] dark:border-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-xl font-bold text-[#2a3c2e] dark:text-[#a8d5a2] uppercase tracking-wide mb-8">Todos los Productos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {todosLosProductos.map((producto, i) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: (i % 5) * 0.07, duration: 0.4 }}
                >
                  <ProductoCard producto={producto} backendUrl={backendUrl} onAdd={addItem} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

/* ── ProductoCard ───────────────────────────────────────────── */

function ProductoCard({ producto, backendUrl, onAdd }: { producto: Producto, backendUrl: string, onAdd: any }) {
  const [agregado, setAgregado] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAgregar = useCallback(() => {
    onAdd({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagenUrl: producto.imagenUrl });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }, [onAdd, producto]);

  const imgSrc = producto.imagenUrl?.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl || ''}`;

  return (
    <div className="bg-white dark:bg-[#1e293b] border border-[#eae6db] dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group h-full">
      <div className="relative aspect-square w-full mb-4 bg-[#fcfbf9] dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center p-2">
        {producto.oferta && (
          <span className="absolute top-2 right-2 bg-[#d8eed9] dark:bg-[#1a4d24] text-[#2e6b36] dark:text-[#6ba368] text-[10px] font-bold px-2 py-1 rounded-md z-10 animate-fade-in">
            OFERTA
          </span>
        )}
        {producto.imagenUrl ? (
          <img
            src={imgSrc}
            alt={producto.nombre}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-300 dark:text-gray-600">Sin imagen</span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-10 leading-tight mb-2">
          {producto.nombre}
        </h3>
        <p className="text-lg font-bold text-[#2a3c2e] dark:text-[#6ba368] mb-2">
          ${producto.precio.toLocaleString('es-AR')}
        </p>

        <div className="flex items-center gap-1 mb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-800 dark:text-gray-200">4.8</span>
          <span>(125)</span>
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleAgregar}
        disabled={producto.stock <= 0}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
          producto.stock <= 0
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : agregado
              ? 'bg-[#324b3b] text-white border border-[#324b3b] scale-[0.97]'
              : 'bg-white dark:bg-transparent border border-[#324b3b] dark:border-[#6ba368] text-[#324b3b] dark:text-[#6ba368] hover:bg-[#324b3b] hover:text-white dark:hover:bg-[#6ba368] dark:hover:text-[#0f172a] hover:shadow-md'
        }`}
      >
        <ShoppingCart className={`h-4 w-4 ${agregado ? 'animate-bounce-subtle' : ''}`} />
        {producto.stock <= 0 ? 'SIN STOCK' : agregado ? '¡AGREGADO!' : 'AGREGAR'}
      </button>
    </div>
  );
}
