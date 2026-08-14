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
    if (!nombre) return 'bg-[#f0f4f1] text-[#283d2d] border-[#d8e3da]';
    
    const estilos: Record<string, string> = {
      'Mates y Accesorios': 'bg-[#e8f3ec] text-[#2d5c43] border-[#d1e8dc]',
      'Yerbas': 'bg-[#e6f4ea] text-[#1e7e34] border-[#cce8d5]',
      'Termos y Botellas': 'bg-[#e6f0ff] text-[#0056b3] border-[#cce0ff]',
      'Semillas y Frutos Secos': 'bg-[#fdf3e8] text-[#b0703c] border-[#fce7d1]',
      'Snacks y Golosinas': 'bg-[#fcecec] text-[#c92a2a] border-[#f9dada]',
      'Condimentos y Especias': 'bg-[#f4eff8] text-[#6741d9] border-[#e9dff0]',
      'Bombillas y Repuestos': 'bg-[#fdeef4] text-[#a61e4d] border-[#fbdee9]',
      'Vasos y Tazas': 'bg-[#e8f7f0] text-[#0ca678] border-[#d1efdf]',
    };

    return estilos[nombre] || 'bg-[#f0f4f1] text-[#283d2d] border-[#d8e3da]';
  };

  return (
    <div className="max-w-350 mx-auto">
      
      {/* Header Admin */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Productos</h1>
          <p className="text-gray-500 mt-1 text-sm">Gestioná todos los productos de tu tienda</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 bg-white focus:outline-none focus:border-[#324b3b]" />
          </div>
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-[#283d2d] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#f8f9fa]">5</span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="h-9 w-9 rounded-full bg-[#e3e8d8] flex items-center justify-center text-[#283d2d] font-bold">A</div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold text-gray-900 leading-tight">Administrador</span>
              <span className="text-xs text-gray-500">admin@natura.com</span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Tarjetas de Estadísticas Rediseñadas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
          <div className="bg-emerald-50 p-3 rounded-full text-emerald-600"><Package className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">Total productos</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">{totalProductos}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos registrados</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-3 rounded-full text-green-600"><CheckCircle className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">Productos activos</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">{productosActivos}</p>
            <p className="text-[10px] text-gray-400 mt-1">Visibles en la tienda</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 p-3 rounded-full text-amber-500"><PackageX className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">Sin stock</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">{sinStock}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos agotados</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-500"><Tag className="h-6 w-6" /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-0.5">En oferta</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">{enOferta}</p>
            <p className="text-[10px] text-gray-400 mt-1">Productos en promoción</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center relative">
          <p className="text-xs text-gray-500 font-medium mb-1">Valor total inventario</p>
          <p className="text-2xl font-bold text-gray-900">${valorInventario.toLocaleString('es-AR')}</p>
          <p className="text-[10px] text-gray-400 mt-1">Valor aproximado</p>
          <div className="absolute right-4 top-4 bg-blue-50 text-blue-500 p-2 rounded-full"><span className="font-bold text-lg leading-none">$</span></div>
        </div>
      </div>

      {/* Toolbar Tabla */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Buscar productos..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full md:w-60 focus:outline-none" />
          </div>
          <select className="border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-600 bg-white focus:outline-none"><option>Todas las categorías</option></select>
          <select className="border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-600 bg-white focus:outline-none"><option>Todos los estados</option></select>
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"><Filter className="h-4 w-4"/> Filtros</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
             Exportar
          </button>
          <button onClick={() => {setProductoSeleccionado(null); setIsModalOpen(true);}} className="bg-[#283d2d] hover:bg-[#1e2e22] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="h-4 w-4" /> Agregar producto
          </button>
        </div>
      </div>

      {/* Tabla de Productos Estilo Natura */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 w-10"><input type="checkbox" className="rounded border-gray-300 text-[#283d2d] focus:ring-[#283d2d]"/></th>
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
            <tbody className="divide-y divide-gray-100">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300 text-[#283d2d] focus:ring-[#283d2d]"/></td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                      {producto.imagenUrl ? (
                        <img src={producto.imagenUrl.startsWith('http') ? producto.imagenUrl : `${backendUrl}${producto.imagenUrl}`} alt={producto.nombre} className="h-full w-full object-contain" />
                      ) : (
                        <Package className="h-6 w-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex flex-col max-w-50">
                      <span className="font-semibold text-gray-900 truncate">{producto.nombre}</span>
                      <span className="text-xs text-gray-400 mt-0.5 truncate">Ref: P-{producto.id.toString().padStart(4, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border whitespace-nowrap ${getCategoriaEstilo(producto.categoria?.nombre)}`}>
                      {producto.categoria?.nombre || 'General'}
                    </span>
                </td>
                  <td className="px-6 py-4 font-bold text-gray-900">${producto.precio.toLocaleString('es-AR')}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`font-bold ${producto.stock > 0 ? 'text-[#283d2d]' : 'text-red-600'}`}>{producto.stock}</span>
                      <span className={`text-[10px] ${producto.stock > 0 ? 'text-gray-500' : 'text-red-500'}`}>{producto.stock > 0 ? 'En stock' : 'Sin stock'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${producto.estado ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${producto.estado ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {producto.estado ? 'Activo' : 'Inactivo'}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {producto.destacado ? <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mx-auto" /> : <Star className="h-5 w-5 text-gray-300 mx-auto" />}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {producto.oferta ? <span className="bg-[#d8eed9] text-[#2e6b36] text-[10px] font-bold px-2 py-1 rounded">OFERTA</span> : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => {setProductoSeleccionado(producto); setIsModalOpen(true);}} className="p-1.5 text-gray-400 hover:text-[#283d2d] border border-gray-200 rounded hover:bg-gray-50 transition-colors" title="Editar"><Edit2 className="h-4 w-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-[#283d2d] border border-gray-200 rounded hover:bg-gray-50 transition-colors" title="Duplicar"><Copy className="h-4 w-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-[#283d2d] border border-gray-200 rounded hover:bg-gray-50 transition-colors" title="Ver"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => eliminarProducto(producto.id)} className="p-1.5 text-red-400 hover:text-red-600 border border-red-100 hover:bg-red-50 rounded transition-colors" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Footer/Paginación Simulado */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <span>Mostrando 1 a {productos.length} de {productos.length} productos</span>
          <div className="flex items-center gap-1">
             <button className="px-3 py-1 border border-gray-200 bg-white rounded text-gray-400 cursor-not-allowed">{'<'}</button>
             <button className="px-3 py-1 bg-[#283d2d] text-white rounded font-medium">1</button>
             <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">2</button>
             <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">{'>'}</button>
          </div>
        </div>
      </div>

      <ProductoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} producto={productoSeleccionado} onSuccess={cargarProductos} />
    </div>
  );
}