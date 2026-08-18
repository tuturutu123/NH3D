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

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#324b3b]"></div></div>;

  const totalProductos = productos.length;
  const productosActivos = productos.filter(p => p.estado).length;
  const sinStock = productos.filter(p => p.stock <= 0).length;
  const enOferta = productos.filter(p => p.oferta).length;
  const valorInventario = productos.reduce((acc, p) => acc + (p.precio * Math.max(0, p.stock)), 0);
  
  const getCategoriaEstilo = (nombre: string | undefined) => {
    if (!nombre) return 'bg-[#f0f4f1] dark:bg-[#1a3a24] text-[#283d2d] dark:text-[#6ba368] border-[#d8e3da] dark:border-[#2d5c43]';
    
    const estilos: Record<string, string> = {
      'Mates y Accesorios': 'bg-[#e8f3ec] dark:bg-[#1a3a24] text-[#2d5c43] dark:text-[#6ba368] border-[#d1e8dc] dark:border-[#2d5c43]',
      'Yerbas': 'bg-[#e6f4ea] dark:bg-[#1a3a24] text-[#1e7e34] dark:text-[#4ade80] border-[#cce8d5] dark:border-[#2d5c43]',
      'Termos y Botellas': 'bg-[#e6f0ff] dark:bg-[#1e293b] text-[#0056b3] dark:text-[#60a5fa] border-[#cce0ff] dark:border-[#334155]',
      'Semillas y Frutos Secos': 'bg-[#fdf3e8] dark:bg-[#2d2006] text-[#b0703c] dark:text-[#fbbf24] border-[#fce7d1] dark:border-[#533d0a]',
      'Snacks y Golosinas': 'bg-[#fcecec] dark:bg-[#3b1111] text-[#c92a2a] dark:text-[#f87171] border-[#f9dada] dark:border-[#5c1c1c]',
      'Condimentos y Especias': 'bg-[#f4eff8] dark:bg-[#2d1f3d] text-[#6741d9] dark:text-[#a78bfa] border-[#e9dff0] dark:border-[#43316b]',
      'Bombillas y Repuestos': 'bg-[#fdeef4] dark:bg-[#3b1228] text-[#a61e4d] dark:text-[#f472b6] border-[#fbdee9] dark:border-[#5c1c3d]',
      'Vasos y Tazas': 'bg-[#e8f7f0] dark:bg-[#0d3326] text-[#0ca678] dark:text-[#34d399] border-[#d1efdf] dark:border-[#166534]',
    };

    return estilos[nombre] || 'bg-[#f0f4f1] dark:bg-[#1a3a24] text-[#283d2d] dark:text-[#6ba368] border-[#d8e3da] dark:border-[#2d5c43]';
  };

  return (
    <div className="max-w-350 mx-auto">
      
      {/* Header Admin */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Productos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Gestioná todos los productos de tu tienda</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm w-64 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-[#324b3b] dark:focus:border-[#6ba368]" />
          </div>
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-[#283d2d] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#f8f9fa] dark:border-[#0f172a]">5</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="h-9 w-9 rounded-full bg-[#e3e8d8] dark:bg-[#2d5c43] flex items-center justify-center text-[#283d2d] dark:text-[#e3e8d8] font-bold">A</div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">Administrador</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">admin@natura.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400"><Package className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">Total productos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">{totalProductos}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos registrados</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-full text-green-600 dark:text-green-400"><CheckCircle className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">Productos activos</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">{productosActivos}</p>
            <p className="text-[10px] text-gray-400 mt-1">Visibles en la tienda</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-full text-amber-500 dark:text-amber-400"><PackageX className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">Sin stock</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">{sinStock}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos agotados</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-500 dark:text-indigo-400"><Tag className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">En oferta</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-none">{enOferta}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos en promoción</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-center relative">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Valor total inventario</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${valorInventario.toLocaleString('es-AR')}</p>
          <p className="text-[10px] text-gray-400 mt-1">Valor aproximado</p>
          <div className="absolute right-4 top-4 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 p-2 rounded-full"><span className="font-bold text-lg leading-none">$</span></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm w-full md:w-60 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none" />
          </div>
          <select className="border border-gray-200 dark:border-gray-600 rounded-lg text-sm px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1e293b] focus:outline-none"><option>Todas las categorías</option></select>
          <select className="border border-gray-200 dark:border-gray-600 rounded-lg text-sm px-3 py-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-[#1e293b] focus:outline-none"><option>Todos los estados</option></select>
          <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"><Filter className="h-4 w-4"/> Filtros</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
             Exportar
          </button>
          <button onClick={() => {setProductoSeleccionado(null); setIsModalOpen(true);}} className="bg-[#283d2d] hover:bg-[#1e2e22] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="h-4 w-4" /> Agregar producto
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white dark:bg-[#1e293b] text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-10"><input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-[#283d2d] focus:ring-[#283d2d]"/></th>
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
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-[#283d2d] focus:ring-[#283d2d]"/></td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      {producto.imagenUrl ? (
                        <img src={producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl}`} alt={producto.nombre} className="h-full w-full object-contain" />
                      ) : (
                        <Package className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                      )}
                    </div>
                    <div className="flex flex-col max-w-50">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{producto.nombre}</span>
                      <span className="text-xs text-gray-400 mt-0.5 truncate">Ref: P-{producto.id.toString().padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border whitespace-nowrap ${getCategoriaEstilo(producto.categoria?.nombre)}`}>
                      {producto.categoria?.nombre || 'General'}
                    </span>
                </td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100">${producto.precio.toLocaleString('es-AR')}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`font-bold ${producto.stock > 0 ? 'text-[#283d2d] dark:text-[#6ba368]' : 'text-red-600 dark:text-red-400'}`}>{producto.stock}</span>
                      <span className={`text-[10px] ${producto.stock > 0 ? 'text-gray-500' : 'text-red-500'}`}>{producto.stock > 0 ? 'En stock' : 'Sin stock'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${producto.estado ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${producto.estado ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {producto.estado ? 'Activo' : 'Inactivo'}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {producto.destacado ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mx-auto" /> : <Star className="h-5 w-5 text-gray-300 dark:text-gray-600 mx-auto" />}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {producto.oferta ? <span className="bg-[#d8eed9] dark:bg-[#1a4d24] text-[#2e6b36] dark:text-[#6ba368] text-[10px] font-bold px-2 py-1 rounded">OFERTA</span> : <span className="text-gray-300 dark:text-gray-600">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => {setProductoSeleccionado(producto); setIsModalOpen(true);}} className="p-1.5 text-gray-400 hover:text-[#283d2d] dark:hover:text-[#6ba368] border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Editar"><Edit2 className="h-4 w-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-[#283d2d] dark:hover:text-[#6ba368] border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Duplicar"><Copy className="h-4 w-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-[#283d2d] dark:hover:text-[#6ba368] border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" title="Ver"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => eliminarProducto(producto.id)} className="p-1.5 text-red-400 hover:text-red-600 border border-red-100 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-[#0f172a]">
          <span>Mostrando 1 a {productos.length} de {productos.length} productos</span>
          <div className="flex items-center gap-1">
             <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] rounded text-gray-400 cursor-not-allowed">{'<'}</button>
             <button className="px-3 py-1 bg-[#283d2d] text-white rounded font-medium">1</button>
             <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] rounded hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
             <button className="px-3 py-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] rounded hover:bg-gray-50 dark:hover:bg-gray-700">{'>'}</button>
          </div>
        </div>
      </div>

      <ProductoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} producto={productoSeleccionado} onSuccess={cargarProductos} />
    </div>
  );
}
