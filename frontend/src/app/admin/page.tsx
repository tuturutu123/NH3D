/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Package, CheckCircle, PackageX, Tag, Plus, Edit2, Trash2, Search, Filter, Copy, Eye, Bell, ChevronDown, Star } from 'lucide-react';
import { api } from '../../lib/api';
import ProductoModal, { Producto } from '../../components/admin/ProductoModal';

export default function AdminDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  const cargarProductos = async () => {
    try {
      const res = await api.get('/productos');
      setProductos(res.data);
    } catch (error) { console.error('Error', error); } finally { setLoading(false); }
  };

  useEffect(() => { cargarProductos(); }, []);

  const eliminarProducto = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try { await api.delete(`/productos/${id}`); cargarProductos(); } catch (error) { alert('Error al eliminar'); }
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#22d3ee]"></div></div>;

  const totalProductos = productos.length;
  const productosActivos = productos.filter(p => p.estado).length;
  const sinStock = productos.filter(p => p.stock <= 0).length;
  const enOferta = productos.filter(p => p.oferta).length;
  const valorInventario = productos.reduce((acc, p) => acc + (p.precio * Math.max(0, p.stock)), 0);

  const getCategoriaEstilo = (nombre: string | undefined) => {
    if (!nombre) return 'cat-badge-teal';
    const mapa: Record<string, string> = {
      'Llaveros': 'cat-badge-teal',
      'Mates y Bombillas': 'cat-badge-cyan',
      'Porta Sahumerios': 'cat-badge-sky',
      'Dijes y Accesorios': 'cat-badge-teal',
      'Soportes y Organizadores': 'cat-badge-dark-teal',
      'Juguetes y Juegos': 'cat-badge-deep',
      'Personajes y Figuras': 'cat-badge-deep',
      'Utilidades del Hogar': 'cat-badge-teal',
    };
    return mapa[nombre] || 'cat-badge-teal';
  };

  return (
    <div className="max-w-350 mx-auto">
      
      {/* Header Admin */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Productos</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Gestioná todos los productos de tu tienda</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-64 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]" />
          </div>
          <button className="relative p-2 text-[#71717a] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-xl transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505] text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center font-mono">5</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-black/[0.06] dark:border-white/[0.06]">
            <div className="h-9 w-9 rounded-xl bg-[#0891b2] dark:bg-[#22d3ee] flex items-center justify-center text-white dark:text-[#050505] font-bold text-sm">A</div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa] leading-tight">Administrador</span>
              <span className="text-xs text-[#71717a] dark:text-[#52525b] font-mono">admin@nhproducciones.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#a1a1aa]" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Package} label="Total productos" value={totalProductos} sub="Productos registrados" accent />
        <StatCard icon={CheckCircle} label="Productos activos" value={productosActivos} sub="Visibles en la tienda" green />
        <StatCard icon={PackageX} label="Sin stock" value={sinStock} sub="Productos agotados" yellow />
        <StatCard icon={Tag} label="En oferta" value={enOferta} sub="Productos en promoción" purple />
        <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl flex flex-col justify-center relative hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
          <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-1">Valor total inventario</p>
          <p className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] font-mono">{'$'}{valorInventario.toLocaleString('es-AR')}</p>
          <p className="text-[10px] text-[#a1a1aa] dark:text-[#52525b] mt-1">Valor aproximado</p>
          <div className="absolute right-4 top-4 bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] p-2 rounded-xl"><span className="font-bold text-lg leading-none font-mono">$</span></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-60 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none placeholder:text-[#a1a1aa]" />
          </div>
          <select className="border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm px-3 py-2 text-[#52525b] dark:text-[#a1a1aa] bg-white dark:bg-[#0a0a0a] focus:outline-none"><option>Todas las categorías</option></select>
          <select className="border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm px-3 py-2 text-[#52525b] dark:text-[#a1a1aa] bg-white dark:bg-[#0a0a0a] focus:outline-none"><option>Todos los estados</option></select>
          <button className="flex items-center gap-2 border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] rounded-xl px-4 py-2 text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"><Filter className="h-4 w-4"/> Filtros</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] rounded-xl px-4 py-2 text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors">
             Exportar
          </button>
          <button onClick={() => {setProductoSeleccionado(null); setIsModalOpen(true);}} className="bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#06b6d4] text-white dark:text-[#050505] px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-[0_2px_10px_-2px_rgba(8,145,178,0.3)]">
            <Plus className="h-4 w-4" /> Agregar producto
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[#71717a] dark:text-[#52525b] font-semibold border-b border-black/[0.04] dark:border-white/[0.04] text-[10px] uppercase tracking-[0.15em] font-mono">
              <tr>
                <th className="px-6 py-4 w-10"><input type="checkbox" className="rounded border-black/10 dark:border-white/10 text-[#0891b2] focus:ring-[#0891b2]"/></th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-4 py-4 text-center">Destacado</th>
                <th className="px-4 py-4 text-center">Oferta</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {productos.map((producto) => (
                <ProductRow
                  key={producto.id}
                  producto={producto}
                  backendUrl={backendUrl}
                  getCategoriaEstilo={getCategoriaEstilo}
                  onEdit={(p) => { setProductoSeleccionado(p); setIsModalOpen(true); }}
                  onDelete={eliminarProducto}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-sm text-[#71717a] dark:text-[#52525b]">
          <span className="font-mono text-[11px]">Mostrando 1 a {productos.length} de {productos.length} productos</span>
          <div className="flex items-center gap-1">
             <button className="px-3 py-1 border border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] rounded-lg text-[#a1a1aa] cursor-not-allowed font-mono text-[11px]">{'<'}</button>
             <button className="px-3 py-1 bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505] rounded-lg font-medium font-mono text-[11px]">1</button>
             <button className="px-3 py-1 border border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.04] font-mono text-[11px]">2</button>
             <button className="px-3 py-1 border border-black/[0.04] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.04] font-mono text-[11px]">{'>'}</button>
          </div>
        </div>
      </div>

      <ProductoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} producto={productoSeleccionado} onSuccess={cargarProductos} />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent, green, yellow, purple }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  sub: string;
  accent?: boolean;
  green?: boolean;
  yellow?: boolean;
  purple?: boolean;
}) {
  const colorClass = accent ? 'text-[#0891b2] dark:text-[#22d3ee]' : green ? 'text-[#22c55e]' : yellow ? 'text-[#f59e0b]' : 'text-[#8b5cf6]';
  const bgClass = accent ? 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10' : green ? 'bg-[#22c55e]/10' : yellow ? 'bg-[#f59e0b]/10' : 'bg-[#8b5cf6]/10';
  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl flex items-center gap-4 hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
      <div className={bgClass + ' p-3 rounded-xl ' + colorClass}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] leading-none font-mono">{value}</p>
        <p className="text-[10px] text-[#a1a1aa] dark:text-[#52525b] mt-1">{sub}</p>
      </div>
    </div>
  );
}

function ProductRow({ producto, backendUrl, getCategoriaEstilo, onEdit, onDelete }: {
  producto: Producto;
  backendUrl: string;
  getCategoriaEstilo: (n?: string) => string;
  onEdit: (p: Producto) => void;
  onDelete: (id: number) => void;
}) {
  const badgeColors: Record<string, string> = {
    'cat-badge-teal': 'bg-[#0891b2]/10 text-[#22d3ee]',
    'cat-badge-cyan': 'bg-[#22d3ee]/10 text-[#67e8f9]',
    'cat-badge-sky': 'bg-[#06b6d4]/10 text-[#06b6d4]',
    'cat-badge-dark-teal': 'bg-[#0e7490]/10 text-[#0e7490]',
    'cat-badge-deep': 'bg-[#155e75]/10 text-[#155e75]',
  };
  const catStyle = getCategoriaEstilo(producto.categoria?.nombre);
  const badgeColor = badgeColors[catStyle] || badgeColors['cat-badge-teal'];

  return (
    <tr className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-6 py-4"><input type="checkbox" className="rounded border-black/10 dark:border-white/10 text-[#0891b2] focus:ring-[#0891b2]"/></td>
      <td className="px-6 py-4 flex items-center gap-4">
        <div className="h-11 w-11 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center p-1">
          {producto.imagenUrl ? (
            <img src={producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl}`} alt={producto.nombre} className="h-full w-full object-contain" />
          ) : (
            <Package className="h-5 w-5 text-[#a1a1aa]" />
          )}
        </div>
        <div className="flex flex-col max-w-50">
          <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] truncate">{producto.nombre}</span>
          <span className="text-[10px] text-[#a1a1aa] mt-0.5 truncate font-mono">Ref: P-{producto.id.toString().padStart(4, '0')}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={'px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide border whitespace-nowrap font-mono ' + badgeColor}>
          {producto.categoria?.nombre || 'General'}
        </span>
      </td>
      <td className="px-6 py-4 font-bold text-[#0a0a0a] dark:text-[#fafafa] font-mono">{'$'}{producto.precio.toLocaleString('es-AR')}</td>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className={producto.stock > 0 ? 'font-bold font-mono text-[#0891b2] dark:text-[#22d3ee]' : 'font-bold font-mono text-[#ef4444]'}>{producto.stock}</span>
          <span className={producto.stock > 0 ? 'text-[10px] text-[#a1a1aa]' : 'text-[10px] text-[#ef4444]'}>{producto.stock > 0 ? 'En stock' : 'Sin stock'}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        {producto.estado ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium border font-mono bg-[#22c55e]/10 text-[#22c55e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></span>
            Activo
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium border font-mono bg-[#ef4444]/10 text-[#ef4444]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]"></span>
            Inactivo
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-center">
        {producto.destacado ? <Star className="h-4 w-4 fill-[#fbbf24] text-[#fbbf24] mx-auto" /> : <span className="block w-4 mx-auto text-[#a1a1aa]/30">-</span>}
      </td>
      <td className="px-4 py-4 text-center">
        {producto.oferta ? <span className="bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] text-[9px] font-bold px-2 py-1 rounded-md font-mono tracking-wide">OFERTA</span> : <span className="text-[#a1a1aa]/30">-</span>}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => onEdit(producto)} className="p-1.5 text-[#a1a1aa] hover:text-[#0891b2] dark:hover:text-[#22d3ee] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-all duration-200" title="Editar"><Edit2 className="h-3.5 w-3.5" /></button>
          <button className="p-1.5 text-[#a1a1aa] hover:text-[#0891b2] dark:hover:text-[#22d3ee] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-all duration-200" title="Duplicar"><Copy className="h-3.5 w-3.5" /></button>
          <button className="p-1.5 text-[#a1a1aa] hover:text-[#0891b2] dark:hover:text-[#22d3ee] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-all duration-200" title="Ver"><Eye className="h-3.5 w-3.5" /></button>
          <button onClick={() => onDelete(producto.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Eliminar"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      </td>
    </tr>
  );
}
