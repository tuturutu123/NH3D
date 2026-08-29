/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Ticket, Plus, Trash2, Percent, X, Check, Edit2 } from 'lucide-react';

interface Cupon {
  id: number;
  codigo: string;
  descuento: number;
  activo: boolean;
}

export default function AdminCuponesPage() {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descuento, setDescuento] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editCodigo, setEditCodigo] = useState('');
  const [editDescuento, setEditDescuento] = useState('');

  const cargar = async () => {
    try {
      const res = await api.get('/cupones');
      setCupones(res.data);
    } catch (err) {
      console.error('Error al cargar cupones', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      await api.post('/cupones', { codigo: codigo.trim(), descuento: parseFloat(descuento) });
      setCodigo('');
      setDescuento('');
      cargar();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el cupón');
    }
  };

  const toggleActivo = async (c: Cupon) => {
    try {
      await api.patch(`/cupones/${c.id}`, { activo: !c.activo });
      setCupones((list) => list.map((x) => (x.id === c.id ? { ...x, activo: !x.activo } : x)));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar el cupón');
    }
  };

  const handleGuardarEdit = async (id: number) => {
    try {
      setError('');
      await api.patch(`/cupones/${id}`, {
        codigo: editCodigo.trim(),
        descuento: parseFloat(editDescuento),
      });
      setEditId(null);
      cargar();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar el cupón');
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este cupón?')) return;
    try {
      await api.delete(`/cupones/${id}`);
      setCupones((list) => list.filter((x) => x.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'No se pudo eliminar el cupón.');
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Cupones</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Creá y gestioná códigos de descuento</p>
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
            <Ticket className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee]" /> Nuevo Cupón
          </h2>
          <form onSubmit={handleCrear} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] mb-1">Código</label>
              <input
                type="text"
                required
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="Ej: NUEVO15, BIENVENIDA..."
                className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-sm font-mono bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] transition-colors uppercase"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa] mb-1">Descuento (%)</label>
              <div className="relative">
                <input
                  type="number"
                  required
                  min={0}
                  max={100}
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3.5 pr-8 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-sm font-mono bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] transition-colors"
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] py-2.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4" /> Crear Cupón
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] dark:border-white/[0.04]">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Cupones Creados ({cupones.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[#71717a] dark:text-[#52525b] font-semibold border-b border-black/[0.04] dark:border-white/[0.04] text-[10px] uppercase tracking-[0.15em] font-mono">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Código</th>
                  <th className="px-6 py-4">Descuento</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
                {cupones.map((c) => (
                  <tr key={c.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-[#a1a1aa]">#{c.id}</td>
                    <td className="px-6 py-4 font-mono font-bold text-[#0891b2] dark:text-[#22d3ee] tracking-wider">
                      {editId === c.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            autoFocus
                            value={editCodigo}
                            onChange={(e) => setEditCodigo(e.target.value.toUpperCase())}
                            className="w-40 rounded-lg border border-black/[0.06] dark:border-white/[0.06] px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] bg-[#fafafa] dark:bg-white/[0.03] text-[#0891b2] dark:text-[#22d3ee] uppercase"
                          />
                        </div>
                      ) : (
                        c.codigo
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editId === c.id ? (
                        <input
                          value={editDescuento}
                          onChange={(e) => setEditDescuento(e.target.value)}
                          type="number"
                          className="w-20 rounded-lg border border-black/[0.06] dark:border-white/[0.06] px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa]"
                        />
                      ) : (
                        <span className="font-bold text-[#0a0a0a] dark:text-[#fafafa] font-mono">{c.descuento}%</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleActivo(c)} title="Cambiar estado">
                        {c.activo ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium border font-mono bg-[#22c55e]/10 text-[#22c55e]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"></span> Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium border font-mono bg-[#ef4444]/10 text-[#ef4444]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]"></span> Inactivo
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {editId === c.id ? (
                          <>
                            <button onClick={() => handleGuardarEdit(c.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#22c55e] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#22c55e]/10 transition-all duration-200" title="Guardar"><Check className="h-4 w-4" /></button>
                            <button onClick={() => setEditId(null)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Cancelar"><X className="h-4 w-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => { setEditId(c.id); setEditCodigo(c.codigo); setEditDescuento(String(c.descuento)); }} className="p-1.5 text-[#a1a1aa] hover:text-[#0891b2] dark:hover:text-[#22d3ee] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-all duration-200" title="Editar"><Edit2 className="h-4 w-4" /></button>
                            <button onClick={() => handleEliminar(c.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {cupones.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-[#a1a1aa]">No hay cupones registrados.</td>
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
