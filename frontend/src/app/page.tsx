/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { api } from '../lib/api';
import { catalogProducts, catalogCategories } from '../lib/catalog';
import { useCartStore } from '../store/cartStore';
import { MapPin, Phone, ShoppingCart, Truck, Star, ArrowRight, Box, PenTool, Layers, Package, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import ProductCarousel from '../components/ProductCarousel';
import SmartImage from '../components/SmartImage';

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
  const [catSeleccionada, setCatSeleccionada] = useState<number | null>(null);
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

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="shimmer-bg h-12 w-72 rounded-xl mb-3" />
          <div className="shimmer-bg h-4 w-96 max-w-full rounded-lg mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/[0.04] dark:bg-white/[0.02] border border-white/[0.04] rounded-2xl p-3 md:p-4">
                <div className="shimmer-bg aspect-square w-full rounded-xl mb-3" />
                <div className="shimmer-bg h-3 w-3/4 rounded mb-2" />
                <div className="shimmer-bg h-3 w-1/2 rounded mb-4" />
                <div className="shimmer-bg h-9 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const productosDestacados = productos.filter(p => p.destacado).slice(0, 10);
  const todosLosProductos = productos.slice(0, 10);

  const getCategoriaImagen = (nombre: string) => {
    const nombreNormalizado = nombre.toLowerCase();
    const mapaImagenes: Record<string, string> = {
      'llaveros': '/productos/llaveros.svg',
      'mates y bombillas': '/categorias/mate-arg.jpg',
      'mates': '/categorias/mate-arg.jpg',
      'porta sahumerios': '/productos/sahumerios.svg',
      'dijes y accesorios': '/productos/dijes.svg',
      'dijes': '/productos/dijes.svg',
      'soportes y organizadores': '/categorias/soporte-note-mody.jpg',
      'soportes para notebook': '/categorias/soporte-note-mody.jpg',
      'juguetes y juegos': '/productos/juguetes.svg',
      'juguetes': '/productos/juguetes.svg',
      'personajes y figuras': '/productos/personajes.svg',
      'personajes': '/productos/personajes.svg',
      'utilidades del hogar': '/productos/utilidades.svg',
      'utilidades': '/productos/utilidades.svg',
    };
    return mapaImagenes[nombreNormalizado] || '/productos/utilidades.svg';
  };

  return (
    <div className="min-h-screen">

      {/* ── Hero Section (Asymmetric 60/40) ────────────────────── */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/portada.jpg" alt="Portada" className="w-full h-full object-cover object-center md:object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/80 to-transparent dark:from-[#050505] dark:via-[#050505]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent dark:from-[#050505] dark:via-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 py-20 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Text Content - 7 cols */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 border border-[#0891b2]/20 dark:border-[#22d3ee]/20 mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] dark:bg-[#22d3ee] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#0891b2] dark:text-[#22d3ee]">Diseño e Impresión 3D</span>
              </motion.div>

              <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#0a0a0a] dark:text-[#fafafa] leading-[0.95] tracking-tighter mb-6">
                Tus ideas,<br />
                <span className="text-[#0891b2] dark:text-[#22d3ee]">impresas</span><br />
                en 3D.
              </h1>

              <p className="text-base md:text-lg text-[#52525b] dark:text-[#a1a1aa] mb-8 max-w-md leading-relaxed">
                Llaveros, mates, porta sahumerios, dijes, soportes, juguetes, figuras y piezas personalizadas. Envíos a todo el país.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                  className="bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#06b6d4] text-white dark:text-[#050505] font-semibold py-3.5 px-7 rounded-xl text-sm text-center transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-[0_4px_20px_-2px_rgba(8,145,178,0.4)] active:scale-[0.98]">
                  <Phone className="h-4 w-4" /> PEDIR PRESUPUESTO
                </a>
                <Link href="/productos"
                  className="border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm text-[#0a0a0a] dark:text-[#fafafa] hover:bg-[#0a0a0a] hover:text-white dark:hover:bg-[#fafafa] dark:hover:text-[#050505] font-semibold py-3.5 px-7 rounded-xl text-center transition-all duration-300 w-full sm:w-auto active:scale-[0.98] text-sm">
                  VER CATÁLOGO
                </Link>
              </div>
            </motion.div>

            {/* Floating Stats - 5 cols */}
            <motion.div
              className="hidden md:flex md:col-span-5 justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {[
                  { value: '500+', label: 'Productos', icon: Package },
                  { value: '100%', label: 'Personalizado', icon: PenTool },
                  { value: '24hs', label: 'Respuesta', icon: Phone },
                  { value: '★ 4.8', label: 'Satisfacción', icon: Star },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-4 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <stat.icon className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee] mb-2" />
                    <p className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight font-mono">{stat.value}</p>
                    <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Bar (Glass) ─────────────────────────────── */}
      <ScrollReveal>
        <section className="py-4 border-y border-black/[0.04] dark:border-white/[0.04]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:justify-between sm:items-center sm:gap-4 text-sm font-medium text-[#52525b] dark:text-[#a1a1aa]">
              {[
                { icon: Truck, text: 'Envíos a todo el país', sub: 'Sin cargo en CABA' },
                { icon: PenTool, text: 'Diseño personalizado', sub: 'Modelado 3D a medida' },
                { icon: Layers, text: 'Impresión PLA / PETG', sub: 'Alta calidad y durabilidad' },
                { icon: Phone, text: 'Atención por WhatsApp', sub: 'Respuesta en 24hs' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 group cursor-default"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 flex items-center justify-center group-hover:bg-[#0891b2]/20 dark:group-hover:bg-[#22d3ee]/20 transition-colors duration-300">
                    <item.icon className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee]" />
                  </div>
                  <div>
                    <span className="text-[13px] font-semibold text-[#0a0a0a] dark:text-[#fafafa] block leading-tight">{item.text}</span>
                    <span className="text-[10px] text-[#a1a1aa] dark:text-[#52525b] font-mono">{item.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Servicios (Asymmetric Bento) ─────────────────────── */}
      <ScrollReveal>
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-2">Qué hacemos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Nuestros Servicios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Box, title: 'Impresión 3D', desc: 'Imprimimos tu pieza en PLA, PETG y más. Traé tu modelo o elegí uno de nuestro catálogo.', cta: 'Pedir cotización', accent: 'from-[#0891b2] to-[#06b6d4]' },
                { icon: PenTool, title: 'Diseño 3D', desc: 'Modelamos desde cero la pieza que imaginás: personalizada, funcional y lista para imprimir.', cta: 'Consultar diseño', accent: 'from-[#0891b2] to-[#0e7490]' },
                { icon: Layers, title: 'Producción por Encargo', desc: 'Series y piezas en volumen para regalos, emprendimientos, merchandising y eventos.', cta: 'Pedir presupuesto', accent: 'from-[#164e63] to-[#0891b2]' },
              ].map((servicio, i) => (
                <motion.div
                  key={i}
                  className="group relative bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-7 md:p-8 flex flex-col hover:bg-white/[0.08] dark:hover:bg-white/[0.05] hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${servicio.accent} flex items-center justify-center mb-5`}>
                    <servicio.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#0a0a0a] dark:text-[#fafafa] mb-2">{servicio.title}</h3>
                  <p className="text-sm text-[#71717a] dark:text-[#a1a1aa] mb-6 leading-relaxed flex-1">{servicio.desc}</p>
                  <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:gap-3 transition-all duration-300">
                    {servicio.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Categorías (Horizontal Scroll) ──────────────────── */}
      <ScrollReveal>
        <section className="py-16 md:py-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-2">Encontrá lo tuyo</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Categorías</h2>
              </div>
              {catSeleccionada !== null && (
                <button
                  onClick={() => { setCatSeleccionada(null); document.getElementById('todos-productos')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-[13px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors"
                >
                  VER TODAS
                </button>
              )}
            </div>
          </div>

          <ProductCarousel speed="slow">
            {[...categorias, ...categorias].map((cat, i) => (
              <button
                key={`cat-${cat.id}-${i}`}
                onClick={() => { setCatSeleccionada(cat.id); document.getElementById('todos-productos')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="flex flex-col items-center gap-3 w-[100px] sm:w-[120px] shrink-0 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-3 transition-all duration-300 group-hover:-translate-y-1 group-active:scale-95 ${
                    catSeleccionada === cat.id
                      ? 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 border border-[#0891b2]/30 dark:border-[#22d3ee]/30 shadow-[0_4px_20px_-4px_rgba(8,145,178,0.2)]'
                      : 'bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] group-hover:border-[#0891b2]/20 dark:group-hover:border-[#22d3ee]/20'
                  }`}
                >
                  <SmartImage
                    src={getCategoriaImagen(cat.nombre)}
                    alt={cat.nombre}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className={`font-medium text-[11px] text-center leading-tight line-clamp-2 transition-colors ${
                  catSeleccionada === cat.id ? 'text-[#0891b2] dark:text-[#22d3ee]' : 'text-[#71717a] dark:text-[#a1a1aa]'
                }`}>
                  {cat.nombre}
                </span>
              </button>
            ))}
          </ProductCarousel>
        </section>
      </ScrollReveal>

      {/* ── Ofertas Destacadas (Bento Asymmetric) ───────────── */}
      <ScrollReveal>
        <section className="py-16 md:py-20" id="ofertas">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-2">Promociones</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Ofertas Destacadas</h2>
              </div>
              <Link href="/productos" className="text-[13px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] flex items-center gap-1 transition-colors">
                VER TODAS <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { title: 'Llaveros\nPersonalizados', sub: 'Con el nombre que quieras', price: '$2.500', bg: 'from-[#0891b2] to-[#0e7490]', text: 'text-white', priceColor: '' },
                { title: 'Porta Sahumerios\nLuna y Estrellas', sub: 'Modelo exclusivo NH3D', price: '$3.500', bg: 'bg-white/[0.04] dark:bg-white/[0.02]', text: 'text-[#0a0a0a] dark:text-[#fafafa]', priceColor: 'text-[#ef4444]', border: 'border border-black/[0.04] dark:border-white/[0.06]' },
                { title: 'Soporte Notebook\nErgonómico', sub: 'Ajustable y plegable', price: '$15.000', bg: 'bg-white/[0.04] dark:bg-white/[0.02]', text: 'text-[#0a0a0a] dark:text-[#fafafa]', priceColor: '', border: 'border border-black/[0.04] dark:border-white/[0.06]' },
                { title: 'Figuras\nFlexi', sub: 'Animales articulados', price: '-20% OFF', bg: 'bg-white/[0.04] dark:bg-white/[0.02]', text: 'text-[#0a0a0a] dark:text-[#fafafa]', priceColor: 'text-[#ef4444]', border: 'border border-black/[0.04] dark:border-white/[0.06]' },
              ].map((oferta, i) => (
                <motion.div
                  key={i}
                  className={`${oferta.bg} ${oferta.text} ${oferta.border || ''} rounded-2xl p-5 md:p-6 relative overflow-hidden h-40 md:h-52 flex flex-col justify-end cursor-default group hover:shadow-lg transition-all duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <h3 className="font-bold text-base md:text-lg uppercase leading-tight mb-1 whitespace-pre-line tracking-tight">{oferta.title}</h3>
                  <p className="text-[11px] opacity-70 mb-3 font-mono">{oferta.sub}</p>
                  <p className={`font-bold text-xl md:text-2xl font-mono ${oferta.priceColor}`}>{oferta.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Productos Destacados (Carrusel) ──────────────────── */}
      {productosDestacados.length > 0 && (
        <ScrollReveal>
          <section className="py-16 md:py-20" id="productos">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-2">Selección</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Productos Destacados</h2>
                </div>
                <Link href="/productos" className="text-[13px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] flex items-center gap-1 transition-colors">
                  VER TODOS <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <ProductCarousel>
              {[...productosDestacados, ...productosDestacados].map((producto, i) => (
                <div key={`${producto.id}-${i}`} className="w-[160px] sm:w-[200px] md:w-[240px] shrink-0">
                  <ProductoCard producto={producto} onAdd={addItem} />
                </div>
              ))}
            </ProductCarousel>
          </section>
        </ScrollReveal>
      )}

      {/* ── Todos los Productos (Grid) ──────────────────────── */}
      <ScrollReveal>
        <section className="py-16 md:py-20 border-t border-black/[0.04] dark:border-white/[0.04]" id="todos-productos">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-2">Catálogo</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">
                  {catSeleccionada !== null
                    ? categorias.find(c => c.id === catSeleccionada)?.nombre || 'Productos'
                    : 'Todos los Productos'}
                </h2>
              </div>
              {catSeleccionada !== null && (
                <button
                  onClick={() => setCatSeleccionada(null)}
                  className="text-[11px] font-mono uppercase tracking-wide font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 px-3 py-1.5 rounded-lg transition-colors"
                >
                  VER TODAS
                </button>
              )}
            </div>
            {(() => {
              const filtrados = catSeleccionada !== null
                ? todosLosProductos.filter(p => p.categoriaId === catSeleccionada)
                : todosLosProductos;
              if (filtrados.length === 0) {
                return (
                  <p className="text-center text-[#a1a1aa] dark:text-[#52525b] py-16 text-sm font-mono">
                    No hay productos en esta categoría.
                  </p>
                );
              }
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
                  {filtrados.map((producto, i) => (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: (i % 5) * 0.06, duration: 0.4 }}
                    >
                      <ProductoCard producto={producto} onAdd={addItem} />
                    </motion.div>
                  ))}
                </div>
              );
            })()}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

/* ── ProductoCard (Premium Design) ────────────────────────────── */

function ProductoCard({ producto, onAdd }: { producto: Producto, onAdd: any }) {
  const [agregado, setAgregado] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAgregar = useCallback(() => {
    onAdd({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagenUrl: producto.imagenUrl });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }, [onAdd, producto]);

  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] rounded-2xl p-3 md:p-4 flex flex-col justify-between hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 hover:shadow-[0_4px_20px_-4px_rgba(8,145,178,0.1)] transition-all duration-500 group h-full">
      <div className="relative aspect-square w-full mb-3 md:mb-4 bg-[#f5f5f5] dark:bg-white/[0.03] rounded-xl overflow-hidden flex items-center justify-center p-2">
        {producto.oferta && (
          <span className="absolute top-2 right-2 bg-[#ef4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md z-10 font-mono tracking-wide">
            OFERTA
          </span>
        )}
        {producto.imagenUrl ? (
          <SmartImage
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <SmartImage
            src="/categorias/default.svg"
            alt={producto.nombre}
            className="object-contain w-full h-full opacity-40"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[12px] sm:text-[13px] md:text-sm font-medium text-[#0a0a0a] dark:text-[#fafafa] line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight mb-2">
          {producto.nombre}
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-bold text-[#0891b2] dark:text-[#22d3ee] mb-2 font-mono">
          ${producto.precio.toLocaleString('es-AR')}
        </p>

        <div className="hidden sm:flex items-center gap-1 mb-3 text-[11px] font-medium text-[#a1a1aa] dark:text-[#52525b]">
          <Star className="h-3 w-3 fill-[#fbbf24] text-[#fbbf24]" />
          <span className="text-[#52525b] dark:text-[#a1a1aa]">4.8</span>
          <span className="font-mono">(125)</span>
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleAgregar}
        disabled={producto.stock <= 0}
        className={`w-full py-2 md:py-2.5 rounded-xl font-semibold text-[11px] md:text-xs flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.97] ${
          producto.stock <= 0
            ? 'bg-white/[0.04] dark:bg-white/[0.02] text-[#a1a1aa] dark:text-[#52525b] cursor-not-allowed border border-black/[0.04] dark:border-white/[0.06]'
            : agregado
              ? 'bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505] border border-[#0891b2] dark:border-[#22d3ee]'
              : 'border border-black/[0.08] dark:border-white/[0.1] text-[#0a0a0a] dark:text-[#fafafa] hover:bg-[#0891b2] hover:text-white dark:hover:bg-[#22d3ee] dark:hover:text-[#050505] hover:border-[#0891b2] dark:hover:border-[#22d3ee]'
        }`}
      >
        <ShoppingCart className={`h-3.5 w-3.5 ${agregado ? 'animate-bounce-subtle' : ''}`} />
        {producto.stock <= 0 ? 'SIN STOCK' : agregado ? '¡AGREGADO!' : 'AGREGAR'}
      </button>
    </div>
  );
}
