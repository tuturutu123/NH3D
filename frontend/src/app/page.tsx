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
import { MapPin, Phone, ShoppingCart, Truck, Star, ArrowRight, Box, PenTool, Layers } from 'lucide-react';
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
      <div className="bg-[#f4f7fa] dark:bg-[#0f172a] min-h-screen py-16 animate-fade-in">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="shimmer-bg h-10 w-56 md:w-72 rounded-xl mb-3" />
          <div className="shimmer-bg h-4 w-80 max-w-full rounded-lg mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#1e293b] border border-[#dce5ee] dark:border-gray-700 rounded-2xl p-3 md:p-4">
                <div className="shimmer-bg aspect-square w-full rounded-xl mb-3" />
                <div className="shimmer-bg h-3 w-3/4 rounded mb-2" />
                <div className="shimmer-bg h-3 w-1/2 rounded mb-4" />
                <div className="shimmer-bg h-8 w-full rounded-lg" />
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
    <div className="bg-[#f4f7fa] dark:bg-[#0f172a] min-h-screen">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative py-16 md:py-32 overflow-hidden border-b border-[#dbe4ec] dark:border-gray-800">
        <div className="absolute inset-0 z-0">
          <img src="/portada.jpg" alt="Portada" className="w-full h-full object-cover object-center md:object-right pointer-events-none select-none" />
        </div>
        <div className="absolute inset-0 z-10 bg-linear-to-r from-white/80 via-white/50 to-transparent dark:from-[#0f172a]/90 dark:via-[#0f172a]/60" />

        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <h1 className="text-[2rem] sm:text-5xl md:text-7xl font-extrabold text-[#132a45] dark:text-[#67e8f9] leading-[1.1] mb-4 md:mb-6 tracking-tight">
              Tus ideas,<br />impresas en<br /><span className="text-[#0369a1] dark:text-[#22d3ee]">3D.</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-800 dark:text-gray-300 mb-6 md:mb-8 font-medium max-w-md">
              Llaveros, mates, porta sahumerios, dijes, soportes, juguetes, figuras y piezas personalizadas. Diseño e impresión 3D en Villa María con envíos a todo el país.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3 px-6 md:py-3.5 rounded-full text-center transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 w-full sm:w-auto hover:shadow-xl hover:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base">
                <Phone className="h-4 w-4 md:h-5 md:w-5" /> PEDIR PRESUPUESTO
              </a>
              <Link href="/productos"
                className="border-2 border-[#132a45] dark:border-[#22d3ee] bg-[#e1ebf3]/50 dark:bg-gray-800/50 backdrop-blur-sm text-[#132a45] dark:text-[#22d3ee] hover:bg-[#132a45] hover:text-white dark:hover:bg-[#22d3ee] dark:hover:text-[#0f172a] font-bold py-3 px-6 md:py-3.5 md:px-8 rounded-full text-center transition-all duration-300 w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base">
                VER CATÁLOGO
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Bar ─────────────────────────────────────── */}
      <ScrollReveal>
        <section className="bg-white dark:bg-[#111827] py-6 md:py-6 border-b border-[#dbe4ec] dark:border-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:justify-between sm:items-center sm:gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              <motion.div className="flex items-center gap-3 stagger-1" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Truck className="h-5 w-5 text-[#0ea5e9] dark:text-[#22d3ee]" />
                <span>Envíos a todo<br /><span className="text-xs text-gray-500 font-normal">el país</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-2" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <PenTool className="h-6 w-6 text-[#0ea5e9] dark:text-[#22d3ee]" />
                <span>Diseño<br /><span className="text-xs text-gray-500 font-normal">personalizado</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-3" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Layers className="h-6 w-6 text-[#0ea5e9] dark:text-[#22d3ee]" />
                <span>Impresión de<br /><span className="text-xs text-gray-500 font-normal">calidad PLA / PETG</span></span>
              </motion.div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <motion.div className="flex items-center gap-3 stagger-4" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <Phone className="h-6 w-6 text-[#0ea5e9] dark:text-[#22d3ee]" />
                <span>Atención por<br /><span className="text-xs text-gray-500 font-normal">WhatsApp</span></span>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Servicios ─────────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-14 md:py-16 bg-white dark:bg-[#111827] border-y border-[#dbe4ec] dark:border-gray-800">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-lg md:text-xl font-bold text-[#132a45] dark:text-[#67e8f9] uppercase tracking-wide mb-2 text-center">Nuestros Servicios</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-10">Del archivo al objeto: te acompañamos en todo el proceso.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: Box, title: 'Impresión 3D', desc: 'Imprimimos tu pieza en PLA, PETG y más. Traé tu modelo o elegí uno de nuestro catálogo.', cta: 'Pedir cotización' },
                { icon: PenTool, title: 'Diseño 3D', desc: 'Modelamos desde cero la pieza que imaginás: personalizada, funcional y lista para imprimir.', cta: 'Consultar por un diseño' },
                { icon: Layers, title: 'Producción por Encargo', desc: 'Series y piezas en volumen para regalos, emprendimientos, merchandising y eventos.', cta: 'Pedir presupuesto' },
              ].map((servicio, i) => (
                <motion.div
                  key={i}
                  className="bg-[#f4f7fa] dark:bg-[#1e293b] border border-[#dbe4ec] dark:border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#154971] dark:bg-[#155e75] flex items-center justify-center mb-4">
                    <servicio.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#132a45] dark:text-gray-100 mb-2">{servicio.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">{servicio.desc}</p>
                  <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#0369a1] dark:text-[#22d3ee] hover:text-[#132a45] dark:hover:text-white transition-colors">
                    {servicio.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Categorías ──────────────────────────────────────── */}
      <ScrollReveal>
        <section className="py-14 md:py-12 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-6 md:mb-8">
              <div>
                <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#0369a1] dark:text-[#22d3ee] font-semibold mb-1">Encontrá lo tuyo</p>
                <h2 className="text-lg md:text-xl font-bold text-[#132a45] dark:text-[#67e8f9] uppercase tracking-wide">Categorías</h2>
              </div>
              {catSeleccionada !== null && (
                <button
                  onClick={() => { setCatSeleccionada(null); document.getElementById('todos-productos')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="text-xs md:text-sm font-bold text-[#0369a1] dark:text-[#22d3ee] hover:text-[#132a45] dark:hover:text-white transition-colors"
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
                className="flex flex-col items-center gap-2.5 w-[104px] sm:w-[124px] shrink-0 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center p-3 transition-all duration-300 group-hover:-translate-y-1 group-active:scale-95 ${
                    catSeleccionada === cat.id
                      ? 'border-2 border-[#154971] dark:border-[#22d3ee] shadow-md scale-105'
                      : 'border border-[#dbe4ec] dark:border-gray-700 shadow-sm group-hover:border-[#154971] dark:group-hover:border-[#22d3ee] group-hover:shadow-md'
                  }`}
                >
                  <SmartImage
                    src={getCategoriaImagen(cat.nombre)}
                    alt={cat.nombre}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span
                  className={`font-semibold text-[10px] sm:text-xs text-center leading-tight line-clamp-2 transition-colors ${
                    catSeleccionada === cat.id ? 'text-[#154971] dark:text-[#22d3ee] font-bold' : 'text-gray-800 dark:text-gray-300'
                  }`}
                >
                  {cat.nombre}
                </span>
              </button>
            ))}
          </ProductCarousel>
        </section>
      </ScrollReveal>

      {/* ── Ofertas Destacadas ───────────────────────────────── */}
      <ScrollReveal>
        <section className="py-10 md:py-8" id="ofertas">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-5 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-[#132a45] dark:text-[#67e8f9] uppercase tracking-wide">Ofertas Destacadas</h2>
              <Link href="/productos" className="text-xs md:text-sm font-bold text-[#0369a1] dark:text-[#22d3ee] hover:text-[#132a45] flex items-center gap-1">VER TODAS <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { title: 'Llaveros\nPersonalizados', sub: 'Con el nombre que quieras', price: '$2.500', bg: 'bg-[#155e75] dark:bg-[#164e63]', text: 'text-white', priceColor: '' },
                { title: 'Porta Sahumerios\nLuna y Estrellas', sub: 'Modelo exclusivo NH3D', price: '$3.500', bg: 'bg-[#eef4f9] dark:bg-[#1e293b]', text: 'text-[#132a45] dark:text-gray-100', priceColor: 'text-[#b4483a]', border: 'border border-[#dbe4ec] dark:border-gray-700' },
                { title: 'Soporte Notebook\nErgonómico', sub: 'Ajustable y plegable', price: '$15.000', bg: 'bg-[#eaf3fa] dark:bg-[#1e293b]', text: 'text-[#132a45] dark:text-gray-100', priceColor: '', border: 'border border-[#dbe4ec] dark:border-gray-700' },
                { title: 'Figuras\nFlexi', sub: 'Animales articulados', price: '-20% OFF', bg: 'bg-[#eff6fb] dark:bg-[#1e293b]', text: 'text-[#132a45] dark:text-gray-100', priceColor: 'text-[#b4483a]', border: 'border border-[#dbe4ec] dark:border-gray-700' },
              ].map((oferta, i) => (
                <motion.div
                  key={i}
                  className={`${oferta.bg} ${oferta.text} ${oferta.border || ''} rounded-2xl p-4 md:p-6 relative overflow-hidden h-36 md:h-48 flex flex-col justify-center cursor-default`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <h3 className="font-bold text-base md:text-xl uppercase leading-tight mb-1 whitespace-pre-line">{oferta.title}</h3>
                  <p className="text-[11px] md:text-xs opacity-90 mb-2 md:mb-3">{oferta.sub}</p>
                  <p className={`font-bold text-lg md:text-2xl ${oferta.priceColor}`}>{oferta.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Productos Destacados (Carrusel infinito) ──────────── */}
      {productosDestacados.length > 0 && (
        <ScrollReveal>
          <section className="py-10 md:py-12" id="productos">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex justify-between items-end mb-5 md:mb-6">
                <h2 className="text-lg md:text-xl font-bold text-[#132a45] dark:text-[#67e8f9] uppercase tracking-wide">Productos Destacados</h2>
                <Link href="/productos" className="text-xs md:text-sm font-bold text-[#0369a1] dark:text-[#22d3ee] hover:text-[#132a45] flex items-center gap-1">VER TODOS <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
            <ProductCarousel>
              {[...productosDestacados, ...productosDestacados].map((producto, i) => (
                <div key={`${producto.id}-${i}`} className="w-[150px] sm:w-[200px] md:w-[240px] shrink-0">
                  <ProductoCard producto={producto} onAdd={addItem} />
                </div>
              ))}
            </ProductCarousel>
          </section>
        </ScrollReveal>
      )}

      {/* ── Todos los Productos ──────────────────────────────── */}
      <ScrollReveal>
        <section className="py-10 md:py-12 bg-white dark:bg-[#111827] border-t border-[#dbe4ec] dark:border-gray-800" id="todos-productos">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <h2 className="text-lg md:text-xl font-bold text-[#132a45] dark:text-[#67e8f9] uppercase tracking-wide">
                {catSeleccionada !== null
                  ? categorias.find(c => c.id === catSeleccionada)?.nombre || 'Productos'
                  : 'Todos los Productos'}
              </h2>
              {catSeleccionada !== null && (
                <button
                  onClick={() => setCatSeleccionada(null)}
                  className="text-[10px] sm:text-xs font-bold text-[#0369a1] dark:text-[#22d3ee] hover:text-[#132a45] dark:hover:text-[#67e8f9] bg-[#cffafe]/50 dark:bg-[#155e75]/30 px-3 py-1.5 rounded-full transition-colors"
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
                  <p className="text-center text-gray-400 dark:text-gray-500 py-12 text-sm">
                    No hay productos en esta categoría.
                  </p>
                );
              }
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 md:gap-6">
                  {filtrados.map((producto, i) => (
                    <motion.div
                      key={producto.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: (i % 5) * 0.07, duration: 0.4 }}
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

/* ── ProductoCard ───────────────────────────────────────────── */

function ProductoCard({ producto, onAdd }: { producto: Producto, onAdd: any }) {
  const [agregado, setAgregado] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleAgregar = useCallback(() => {
    onAdd({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagenUrl: producto.imagenUrl });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  }, [onAdd, producto]);

  return (
    <div className="bg-white dark:bg-[#1e293b] border border-[#dce5ee] dark:border-gray-700 rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
      <div className="relative aspect-square w-full mb-2 md:mb-4 bg-[#f4f8fb] dark:bg-gray-800 rounded-lg md:rounded-xl overflow-hidden flex items-center justify-center p-1.5 md:p-2">
        {producto.oferta && (
          <span className="absolute top-1 right-1 md:top-2 md:right-2 bg-[#cffafe] dark:bg-[#155e75] text-[#0e7490] dark:text-[#22d3ee] text-[8px] md:text-[10px] font-bold px-1 py-px md:px-1.5 md:py-0.5 rounded z-10 animate-fade-in">
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
            className="object-contain w-full h-full opacity-60"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-[11px] sm:text-[13px] md:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[2.5rem] leading-tight mb-1 md:mb-2">
          {producto.nombre}
        </h3>
        <p className="text-sm sm:text-base md:text-lg font-bold text-[#132a45] dark:text-[#22d3ee] mb-1 md:mb-2">
          ${producto.precio.toLocaleString('es-AR')}
        </p>

        <div className="hidden sm:flex items-center gap-1 mb-2 md:mb-4 text-[11px] md:text-xs font-medium text-gray-500 dark:text-gray-400">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-800 dark:text-gray-200">4.8</span>
          <span>(125)</span>
        </div>
      </div>

      <button
        ref={btnRef}
        onClick={handleAgregar}
        disabled={producto.stock <= 0}
        className={`w-full py-1.5 sm:py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-[10px] sm:text-[11px] md:text-xs flex items-center justify-center gap-1 md:gap-2 transition-all duration-300 active:scale-[0.97] ${
          producto.stock <= 0
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : agregado
              ? 'bg-[#154971] text-white border border-[#154971] scale-[0.97]'
              : 'bg-white dark:bg-transparent border border-[#154971] dark:border-[#22d3ee] text-[#154971] dark:text-[#22d3ee] hover:bg-[#154971] hover:text-white dark:hover:bg-[#22d3ee] dark:hover:text-[#0f172a] hover:shadow-md'
        }`}
      >
        <ShoppingCart className={`h-4 w-4 ${agregado ? 'animate-bounce-subtle' : ''}`} />
        {producto.stock <= 0 ? 'SIN STOCK' : agregado ? '¡AGREGADO!' : 'AGREGAR'}
      </button>
    </div>
  );
}
