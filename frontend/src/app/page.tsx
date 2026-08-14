/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../lib/api';
import { useCartStore } from '../store/cartStore';
import { MapPin, Phone, ShieldCheck, ShoppingCart, Truck, Star, ArrowRight } from 'lucide-react';

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
        setProductos(resProductos.data.filter((p: Producto) => p.estado));
        setCategorias(resCategorias.data);
      } catch (error) { console.error('Error al cargar el catálogo'); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#324b3b]"></div></div>;

  const productosDestacados = productos.filter(p => p.destacado).slice(0, 5);
  const todosLosProductos = productos.slice(0, 10);
  
  const getCategoriaImagen = (nombre: string) => {
    // Normalizamos a minúsculas para evitar errores por tipeo
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
    <div className="bg-[#faf9f6] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-32 overflow-hidden border-b border-[#e5e2d6]">
        {/* Imagen de fondo posicionada detrás del contenido — centrada en móvil, a la derecha en desktop */}
        <div className="absolute inset-0 z-0">
          <img src="/portada.png" alt="Portada" className="w-full h-full object-cover object-center md:object-right pointer-events-none select-none" />
        </div>
        {/* Degradado entre la imagen y el contenido para garantizar legibilidad */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/80 via-white/50 to-transparent"></div>

        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#2a3c2e] leading-[1.05] mb-6 tracking-tight">
              Todo lo que<br />te gusta, en un<br />solo lugar.
            </h1>
            <p className="text-base sm:text-lg text-gray-800 mb-8 font-medium max-w-md">
              Mates, yerbas, comidas, snacks, bebidas, accesorios y mucho más.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-6 rounded-full text-center transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 w-full sm:w-auto">
                <Phone className="h-5 w-5" /> PEDIR POR WHATSAPP
              </a>
              <Link href="/productos" className="border-2 border-[#2a3c2e] bg-[#e5e3d9]/50 backdrop-blur-sm text-[#2a3c2e] hover:bg-[#2a3c2e] hover:text-white font-bold py-3.5 px-8 rounded-full text-center transition-all w-full sm:w-auto">
                VER PRODUCTOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-6 border-b border-[#e5e2d6]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-4 text-sm font-medium text-gray-700">
            <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-[#7d6f5f]" /><span>Envíos rápidos<br/><span className="text-xs text-gray-500 font-normal">en Villa Mercedes</span></span></div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 text-[#7d6f5f]" /><span>Pagos seguros<br/><span className="text-xs text-gray-500 font-normal">y protegidos</span></span></div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex items-center gap-3"><Star className="h-6 w-6 text-[#7d6f5f]" /><span>Productos<br/><span className="text-xs text-gray-500 font-normal">de calidad</span></span></div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div className="flex items-center gap-3"><Phone className="h-6 w-6 text-[#7d6f5f]" /><span>Atención<br/><span className="text-xs text-gray-500 font-normal">personalizada</span></span></div>
          </div>
        </div>
      </section>

      {/* Categorías Visuales */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-xl font-bold text-[#2a3c2e] uppercase tracking-wide">Categorías</h2>
            <Link href="/productos" className="text-sm font-bold text-[#627653] hover:text-[#2a3c2e] flex items-center gap-1 transition-colors">
              VER TODAS <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 sm:flex sm:overflow-x-auto pb-4 gap-4 hide-scrollbar">
            {categorias.map((cat) => (
              <a key={cat.id} href={`#cat-${cat.id}`} className="flex flex-col items-center gap-3 min-w-25 group">
                <div className="w-24 h-24 rounded-2xl bg-white border border-[#e5e2d6] shadow-sm flex items-center justify-center p-3 group-hover:border-[#324b3b] transition-colors overflow-hidden">
                  <img 
                    src={getCategoriaImagen(cat.nombre)} 
                    alt={cat.nombre} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                    onError={(e) => { e.currentTarget.src = '/categorias/default.svg'; }}
                  />
                </div>
                <span className="font-semibold text-xs text-center text-gray-800 leading-tight w-20">{cat.nombre}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Destacadas (Banners Estáticos ilustrativos basados en tu diseño) */}
      <section className="py-8" id="ofertas">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold text-[#2a3c2e] uppercase tracking-wide">Ofertas Destacadas</h2>
            <Link href="/productos" className="text-sm font-bold text-[#627653] hover:text-[#2a3c2e] flex items-center gap-1">VER TODAS <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#5a6b5a] rounded-2xl p-6 text-white relative overflow-hidden h-48 flex flex-col justify-center">
              <h3 className="font-bold text-xl uppercase leading-tight mb-1">Combo<br/>Mateador</h3>
              <p className="text-xs opacity-90 mb-3">Mate + Yerba + Bombilla</p>
              <p className="font-bold text-2xl">$15.990</p>
            </div>
            <div className="bg-[#f0ece1] rounded-2xl p-6 text-[#2a3c2e] relative overflow-hidden h-48 flex flex-col justify-center border border-[#e5e2d6]">
              <h3 className="font-bold text-xl uppercase leading-tight mb-1">2 Yerbas<br/>CBSé 500g</h3>
              <p className="text-xs text-gray-600 mb-3">Tradicional o Silueta</p>
              <p className="font-bold text-2xl text-[#b4483a]">$7.990</p>
            </div>
            <div className="bg-[#f8f4e6] rounded-2xl p-6 text-[#2a3c2e] relative overflow-hidden h-48 flex flex-col justify-center border border-[#e5e2d6]">
              <h3 className="font-bold text-xl uppercase leading-tight mb-1">Termo<br/>Stanley 1L</h3>
              <p className="text-xs text-gray-600 mb-3">Clásico verde</p>
              <p className="font-bold text-2xl">$32.990</p>
            </div>
            <div className="bg-[#f7eedd] rounded-2xl p-6 text-[#2a3c2e] relative overflow-hidden h-48 flex flex-col justify-center border border-[#e5e2d6]">
              <h3 className="font-bold text-xl uppercase leading-tight mb-1">Snacks<br/>Favoritos</h3>
              <p className="text-xs text-gray-600 mb-3">Llevando 3 pagás 2</p>
              <p className="font-bold text-2xl text-[#b4483a]">-33% OFF</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Productos Destacados */}
      {productosDestacados.length > 0 && (
        <section className="py-12" id="productos">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-bold text-[#2a3c2e] uppercase tracking-wide">Productos Destacados</h2>
              <Link href="/productos" className="text-sm font-bold text-[#627653] hover:text-[#2a3c2e] flex items-center gap-1">VER TODOS <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {productosDestacados.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} backendUrl={backendUrl} onAdd={addItem} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid de Todos los Productos */}
      <section className="py-12 bg-white border-t border-[#e5e2d6]">
        <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-xl font-bold text-[#2a3c2e] uppercase tracking-wide mb-8">Todos los Productos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {todosLosProductos.map((producto) => (
                <ProductoCard key={producto.id} producto={producto} backendUrl={backendUrl} onAdd={addItem} />
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}

// Tarjeta de Producto (Estilo Natura)
function ProductoCard({ producto, backendUrl, onAdd }: { producto: Producto, backendUrl: string, onAdd: any }) {
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    onAdd({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagenUrl: producto.imagenUrl });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1000);
  };

  return (
    <div className="bg-white border border-[#eae6db] rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group">
      <div className="relative aspect-square w-full mb-4 bg-[#fcfbf9] rounded-xl overflow-hidden flex items-center justify-center p-2">
        {producto.oferta && (
          <span className="absolute top-2 right-2 bg-[#d8eed9] text-[#2e6b36] text-[10px] font-bold px-2 py-1 rounded-md z-10">
            OFERTA
          </span>
        )}
        {producto.imagenUrl ? (
          <img 
            src={producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl}`} 
            alt={producto.nombre} 
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        ) : (
          <span className="text-gray-300">Sin imagen</span>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-10 leading-tight mb-2">
          {producto.nombre}
        </h3>
        <p className="text-lg font-bold text-[#2a3c2e] mb-2">
          ${producto.precio.toLocaleString('es-AR')}
        </p>
        
        {/* Fake Rating for demo purposes */}
        <div className="flex items-center gap-1 mb-4 text-xs font-medium text-gray-500">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-800">4.8</span>
          <span>(125)</span>
        </div>
      </div>
      
      <button 
        onClick={handleAgregar}
        disabled={producto.stock <= 0}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
          producto.stock <= 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : agregado 
              ? 'bg-[#324b3b] text-white border border-[#324b3b]' 
              : 'bg-white border border-[#324b3b] text-[#324b3b] hover:bg-[#324b3b] hover:text-white'
        }`}
      >
        <ShoppingCart className="h-4 w-4" />
        {producto.stock <= 0 ? 'SIN STOCK' : agregado ? '¡AGREGADO!' : 'AGREGAR'}
      </button>
    </div>
  );
}