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
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Categorías</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Gestioná las agrupaciones de productos de tu tienda</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] p-3 rounded-xl text-sm font-medium border border-[#ef4444]/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario de Creación */}
        <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee]" /> Nueva Categoría
          </h2>
          <form onSubmit={handleCrearCategoria} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] mb-1">Nombre de la categoría</label>
              <input
                type="text"
                required
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Ej: Llaveros, Porta Sahumerios..."
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-sm bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" /> Guardar Categoría
            </button>
          </form>
        </div>

        {/* Listado de Categorías */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] dark:border-white/[0.04]">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Categorías Existentes ({categorias.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[#71717a] dark:text-[#52525b] font-semibold border-b border-black/[0.04] dark:border-white/[0.04] text-[10px] uppercase tracking-[0.15em] font-mono">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Productos Asociados</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-[#a1a1aa]">#{cat.id}</td>
                    <td className="px-6 py-4 font-semibold text-[#0a0a0a] dark:text-[#fafafa] flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee]" /> {cat.nombre}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#22c55e]/10 text-[#22c55e] dark:text-[#4ade80] font-bold px-2.5 py-1 rounded-full text-xs font-mono">
                        {cat._count?.productos || 0} productos
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEliminar(cat.id)}
                        className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] hover:bg-[#ef4444]/10 rounded-xl transition-all duration-200 inline-flex items-center justify-center"
                        title="Eliminar categoría"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {categorias.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-[#a1a1aa]">No hay categorías registradas.</td>
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
