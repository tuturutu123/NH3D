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
import { Phone, ShoppingCart, Truck, Star, ArrowRight, Box, PenTool, Layers, Package } from 'lucide-react';
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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/portada.jpg" alt="Portada NH3D" className="w-full h-full object-cover object-center md:object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafafa] via-[#fafafa]/85 to-transparent dark:from-[#050505] dark:via-[#050505]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent dark:from-[#050505] dark:via-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0891b2]/8 dark:bg-[#22d3ee]/8 border border-[#0891b2]/15 dark:border-[#22d3ee]/15 mb-5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] dark:bg-[#22d3ee] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#0891b2] dark:text-[#22d3ee]">Impresión 3D</span>
              </motion.div>

              <h1 className="text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-[#0a0a0a] dark:text-[#fafafa] leading-[1.02] tracking-tighter mb-5">
                Tus ideas,<br />
                <span className="text-[#0891b2] dark:text-[#22d3ee]">impresas</span> en 3D.
              </h1>

              <p className="text-[15px] md:text-base text-[#71717a] dark:text-[#a1a1aa] mb-7 max-w-md leading-relaxed">
                Llaveros, mates, porta sahumerios, dijes, soportes, juguetes y piezas personalizadas. Envíos a todo el país.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                  className="bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#06b6d4] text-white dark:text-[#050505] font-semibold py-3 px-6 rounded-xl text-sm text-center transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto active:scale-[0.98]">
                  <Phone className="h-4 w-4" /> PEDIR PRESUPUESTO
                </a>
                <Link href="/productos"
                  className="border border-black/8 dark:border-white/8 bg-white/60 dark:bg-white/[0.03] backdrop-blur-sm text-[#0a0a0a] dark:text-[#fafafa] hover:bg-[#0a0a0a] hover:text-white dark:hover:bg-[#fafafa] dark:hover:text-[#050505] font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 w-full sm:w-auto active:scale-[0.98] text-sm">
                  VER CATÁLOGO
                </Link>
              </div>
            </motion.div>

            {/* Stats compactos */}
            <motion.div
              className="hidden md:flex md:col-span-5 justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-[280px]">
                {[
                  { value: '500+', label: 'Productos' },
                  { value: '100%', label: 'Personalizado' },
                  { value: '24hs', label: 'Respuesta' },
                  { value: '4.8★', label: 'Satisfacción' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    className="bg-white/50 dark:bg-white/[0.04] backdrop-blur-sm border border-black/[0.04] dark:border-white/[0.06] rounded-xl p-3.5 transition-all duration-300"
                  >
                    <p className="text-xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight font-mono leading-none mb-1">{stat.value}</p>
                    <p className="text-[10px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ──────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-3.5 border-y border-black/[0.04] dark:border-white/[0.04]">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:justify-between sm:items-center sm:gap-6">
              {[
                { icon: Truck, text: 'Envíos a todo el país' },
                { icon: PenTool, text: 'Diseño 3D personalizado' },
                { icon: Layers, text: 'PLA y PETG de calidad' },
                { icon: Phone, text: 'Respuesta en 24hs' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 group cursor-default"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <item.icon className="h-3.5 w-3.5 text-[#0891b2] dark:text-[#22d3ee] shrink-0" />
                  <span className="text-[12px] text-[#52525b] dark:text-[#a1a1aa] font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Servicios ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1.5">Qué hacemos</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Nuestros Servicios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: Box, title: 'Impresión 3D', desc: 'Imprimimos tu pieza en PLA, PETG y más. Traé tu modelo o elegí uno de nuestro catálogo.', cta: 'Pedir cotización' },
                { icon: PenTool, title: 'Diseño 3D', desc: 'Modelamos desde cero la pieza que imaginás: personalizada, funcional y lista para imprimir.', cta: 'Consultar diseño' },
                { icon: Layers, title: 'Producción por Encargo', desc: 'Series y piezas en volumen para regalos, emprendimientos, merchandising y eventos.', cta: 'Pedir presupuesto' },
              ].map((servicio, i) => (
                <motion.div
                  key={i}
                  className="group bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 flex flex-col hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <servicio.icon className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee] mb-4" />
                  <h3 className="font-semibold text-[15px] text-[#0a0a0a] dark:text-[#fafafa] mb-1.5">{servicio.title}</h3>
                  <p className="text-[13px] text-[#71717a] dark:text-[#a1a1aa] mb-5 leading-relaxed flex-1">{servicio.desc}</p>
                  <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:gap-2.5 transition-all duration-300">
                    {servicio.cta} <ArrowRight className="h-3 w-3" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Categorías ────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-12 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1.5">Explorá</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Categorías</h2>
              </div>
              {catSeleccionada !== null && (
                <button
                  onClick={() => { setCatSeleccionada(null); document.getElementById('todos-productos')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-[12px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors"
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
                className="flex flex-col items-center gap-2.5 w-[88px] sm:w-[100px] shrink-0 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl flex items-center justify-center p-2.5 transition-all duration-300 group-hover:-translate-y-0.5 ${
                    catSeleccionada === cat.id
                      ? 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 border border-[#0891b2]/25 dark:border-[#22d3ee]/25'
                      : 'bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] group-hover:border-[#0891b2]/20 dark:group-hover:border-[#22d3ee]/20'
                  }`}
                >
                  <SmartImage
                    src={getCategoriaImagen(cat.nombre)}
                    alt={cat.nombre}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className={`font-medium text-[10px] text-center leading-tight line-clamp-2 transition-colors ${
                  catSeleccionada === cat.id ? 'text-[#0891b2] dark:text-[#22d3ee]' : 'text-[#71717a] dark:text-[#a1a1aa]'
                }`}>
                  {cat.nombre}
                </span>
              </button>
            ))}
          </ProductCarousel>
        </section>
      </ScrollReveal>

      {/* ── Ofertas ───────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-12 md:py-16" id="ofertas">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1.5">Promociones</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Ofertas Destacadas</h2>
              </div>
              <Link href="/productos" className="text-[12px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] flex items-center gap-1 transition-colors">
                VER TODAS <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { title: 'Llaveros Personalizados', price: '$2.500', dark: true },
                { title: 'Porta Sahumerios Luna', price: '$3.500', badge: '-15%' },
                { title: 'Soporte Notebook Ergonómico', price: '$15.000' },
                { title: 'Figuras Flexi', price: '-20% OFF', badge: 'HOT' },
              ].map((oferta, i) => (
                <motion.div
                  key={i}
                  className={`rounded-xl p-5 relative overflow-hidden h-36 md:h-44 flex flex-col justify-end cursor-default transition-all duration-300 hover:-translate-y-0.5 ${
                    oferta.dark
                      ? 'bg-gradient-to-br from-[#0891b2] to-[#0e7490] text-white'
                      : 'bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] text-[#0a0a0a] dark:text-[#fafafa]'
                  }`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {oferta.badge && (
                    <span className="absolute top-3 right-3 bg-[#ef4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded font-mono">
                      {oferta.badge}
                    </span>
                  )}
                  <h3 className="font-semibold text-[13px] md:text-sm uppercase leading-snug mb-2 tracking-tight">{oferta.title}</h3>
                  <p className={`font-bold text-lg md:text-xl font-mono ${oferta.dark ? 'text-white' : 'text-[#0891b2] dark:text-[#22d3ee]'}`}>{oferta.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Productos Destacados ──────────────────────────────── */}
      {productosDestacados.length > 0 && (
        <ScrollReveal>
          <section className="py-12 md:py-16" id="productos">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1.5">Selección</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Productos Destacados</h2>
                </div>
                <Link href="/productos" className="text-[12px] font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] flex items-center gap-1 transition-colors">
                  VER TODOS <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <ProductCarousel>
              {[...productosDestacados, ...productosDestacados].map((producto, i) => (
                <div key={`${producto.id}-${i}`} className="w-[180px] sm:w-[200px] md:w-[220px] shrink-0">
                  <ProductoCard producto={producto} onAdd={addItem} />
                </div>
              ))}
            </ProductCarousel>
          </section>
        </ScrollReveal>
      )}

      {/* ── Todos los Productos ───────────────────────────────── */}
      <ScrollReveal>
        <section className="py-12 md:py-16 border-t border-black/[0.04] dark:border-white/[0.04]" id="todos-productos">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1.5">Catálogo</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">
                  {catSeleccionada !== null
                    ? categorias.find(c => c.id === catSeleccionada)?.nombre || 'Productos'
                    : 'Todos los Productos'}
                </h2>
              </div>
              {catSeleccionada !== null && (
                <button
                  onClick={() => setCatSeleccionada(null)}
                  className="text-[10px] font-mono uppercase tracking-wide font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] bg-[#0891b2]/8 dark:bg-[#22d3ee]/8 px-3 py-1.5 rounded-lg transition-colors"
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
                  <p className="text-center text-[#a1a1aa] dark:text-[#52525b] py-12 text-[13px] font-mono">
                    No hay productos en esta categoría.
                  </p>
                );
              }
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
                  {filtrados.map((producto, i) => (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: (i % 5) * 0.04, duration: 0.3 }}
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

/* ── ProductoCard ────────────────────────────────────────────── */

function ProductoCard({ producto, onAdd }: { producto: Producto, onAdd: any }) {
  const [agregado, setAgregado] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAgregar = useCallback(() => {
    onAdd({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagenUrl: producto.imagenUrl });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }, [onAdd, producto]);

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-xl p-3 flex flex-col justify-between hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300 group h-full">
      <div className="relative aspect-square w-full mb-3 bg-[#f5f5f5] dark:bg-white/[0.03] rounded-lg overflow-hidden flex items-center justify-center p-2">
        {producto.oferta && (
          <span className="absolute top-1.5 right-1.5 bg-[#ef4444] text-white text-[8px] font-bold px-1.5 py-0.5 rounded font-mono z-10">
            OFERTA
          </span>
        )}
        {producto.imagenUrl ? (
          <SmartImage
            src={producto.imagenUrl}
            alt={producto.nombre}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <SmartImage
            src="/categorias/default.svg"
            alt={producto.nombre}
            className="object-contain w-full h-full opacity-30"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col mb-2.5">
        <h3 className="text-[12px] md:text-[13px] font-medium text-[#0a0a0a] dark:text-[#fafafa] line-clamp-2 min-h-[2rem] leading-snug mb-1.5">
          {producto.nombre}
        </h3>
        <p className="text-sm md:text-base font-bold text-[#0891b2] dark:text-[#22d3ee] font-mono">
          ${producto.precio.toLocaleString('es-AR')}
        </p>
      </div>

      <button
        ref={btnRef}
        onClick={handleAgregar}
        disabled={producto.stock <= 0}
        className={`w-full py-2 rounded-lg font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.97] ${
          producto.stock <= 0
            ? 'bg-[#f5f5f5] dark:bg-white/[0.03] text-[#a1a1aa] dark:text-[#52525b] cursor-not-allowed border border-black/[0.04] dark:border-white/[0.06]'
            : agregado
              ? 'bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505]'
              : 'border border-black/[0.08] dark:border-white/[0.1] text-[#0a0a0a] dark:text-[#fafafa] hover:bg-[#0891b2] hover:text-white dark:hover:bg-[#22d3ee] dark:hover:text-[#050505] hover:border-[#0891b2] dark:hover:border-[#22d3ee]'
        }`}
      >
        <ShoppingCart className={`h-3 w-3 ${agregado ? 'animate-bounce-subtle' : ''}`} />
        {producto.stock <= 0 ? 'SIN STOCK' : agregado ? '¡AGREGADO!' : 'AGREGAR'}
      </button>
    </div>
  );
}
