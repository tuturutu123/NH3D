/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Tag, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

interface Marca {
  id: number;
  nombre: string;
  _count?: { productos: number };
}

export default function AdminMarcasPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState('');

  const cargarMarcas = async () => {
    try {
      const res = await api.get('/marcas');
      setMarcas(res.data);
    } catch (err) {
      console.error('Error al cargar marcas', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;
    try {
      setError('');
      await api.post('/marcas', { nombre: nuevoNombre.trim() });
      setNuevoNombre('');
      cargarMarcas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la marca');
    }
  };

  const handleGuardarEdit = async (id: number) => {
    if (!editNombre.trim()) return;
    try {
      setError('');
      await api.patch(`/marcas/${id}`, { nombre: editNombre.trim() });
      setEditId(null);
      setEditNombre('');
      cargarMarcas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar la marca');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta marca?')) return;
    try {
      await api.delete(`/marcas/${id}`);
      cargarMarcas();
    } catch (err: any) {
      alert(err.response?.data?.message || 'No se pudo eliminar la marca.');
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Marcas</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Gestioná las marcas de tus productos</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] p-3 rounded-xl text-sm font-medium border border-[#ef4444]/20">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-[#0a0a0a] p-6 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] shadow-sm h-fit">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee]" /> Nueva Marca
          </h2>
          <form onSubmit={handleCrear} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] mb-1">Nombre de la marca</label>
              <input
                type="text"
                required
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Ej: Bambu Lab, Creality..."
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-sm bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" /> Guardar Marca
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] dark:border-white/[0.04]">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Marcas Existentes ({marcas.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[#71717a] dark:text-[#52525b] font-semibold border-b border-black/[0.04] dark:border-white/[0.04] text-[10px] uppercase tracking-[0.15em] font-mono">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Productos</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {marcas.map((m) => (
                  <tr key={m.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-[#a1a1aa]">#{m.id}</td>
                    <td className="px-6 py-4 font-semibold text-[#0a0a0a] dark:text-[#fafafa]">
                      {editId === m.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            autoFocus
                            value={editNombre}
                            onChange={(e) => setEditNombre(e.target.value)}
                            className="w-full rounded-lg border border-black/[0.06] dark:border-white/[0.06] px-3 py-1.5 text-sm focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa]"
                          />
                        </div>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee]" /> {m.nombre}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#22c55e]/10 text-[#22c55e] dark:text-[#4ade80] font-bold px-2.5 py-1 rounded-full text-xs font-mono">
                        {m._count?.productos || 0} productos
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {editId === m.id ? (
                          <>
                            <button onClick={() => handleGuardarEdit(m.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#22c55e] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#22c55e]/10 transition-all duration-200" title="Guardar"><Check className="h-4 w-4" /></button>
                            <button onClick={() => { setEditId(null); setEditNombre(''); }} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Cancelar"><X className="h-4 w-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditId(m.id); setEditNombre(m.nombre); }} className="p-1.5 text-[#a1a1aa] hover:text-[#0891b2] dark:hover:text-[#22d3ee] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-all duration-200" title="Editar"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleEliminar(m.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {marcas.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-[#a1a1aa]">No hay marcas registradas.</td>
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
