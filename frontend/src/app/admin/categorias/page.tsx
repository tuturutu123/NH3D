/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Tag, Plus, Trash2, FolderPlus } from 'lucide-react';

interface Categoria {
  id: number;
  nombre: string;
  _count?: {
    productos: number;
  };
}

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [error, setError] = useState('');

  const cargarCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      console.error('Error al cargar categorías', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleCrearCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    try {
      setError('');
      await api.post('/categorias', { nombre: nuevoNombre.trim() });
      setNuevoNombre('');
      cargarCategorias();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la categoría');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      await api.delete(`/categorias/${id}`);
      cargarCategorias();
    } catch (err: any) {
      alert(err.response?.data?.message || 'No se puede eliminar la categoría porque tiene productos asignados.');
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#154971]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Categorías</h1>
          <p className="text-gray-500 mt-1 text-sm">Gestioná las agrupaciones de productos de tu tienda</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-3 rounded-xl text-sm font-medium border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Creación */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-[#154971]" /> Nueva Categoría
          </h2>
          <form onSubmit={handleCrearCategoria} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la categoría</label>
              <input
                type="text"
                required
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Ej: Llaveros, Porta Sahumerios..."
                className="w-full rounded-xl border border-gray-200 py-2.5 px-3.5 focus:outline-none focus:border-[#154971] text-sm bg-gray-50/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#122a42] hover:bg-[#0c1c30] text-white py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" /> Guardar Categoría
            </button>
          </form>
        </div>

        {/* Listado de Categorías */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Categorías Existentes ({categorias.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-100 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Productos Asociados</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-gray-400">#{cat.id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#154971]" /> {cat.nombre}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-xs">
                        {cat._count?.productos || 0} productos
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEliminar(cat.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 border border-red-100 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center justify-center"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {categorias.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400">No hay categorías registradas.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}