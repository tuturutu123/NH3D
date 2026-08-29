/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Users, Trash2, Search, ShoppingBag, User as UserIcon } from 'lucide-react';

interface Cliente {
  id: number;
  email?: string;
  rol?: string;
}

export default function AdminClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const cargar = async () => {
    try {
      const res = await api.get('/usuarios');
      setClientes(res.data);
    } catch (err) {
      console.error('Error al cargar clientes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const eliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;
    try {
      await api.delete(`/usuarios/${id}`);
      setClientes((list) => list.filter((x) => x.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'No se pudo eliminar el cliente.');
    }
  };

  const filtrados = clientes.filter((c) =>
    (c.email || '').toLowerCase().includes(busqueda.toLowerCase()),
  );
  const clientesActivos = clientes.length;

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Clientes</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Cuentas de tus clientes registradas en la tienda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard icon={Users} label="Total clientes" value={clientesActivos} sub="Cuentas registradas" textClass="text-[#0891b2] dark:text-[#22d3ee]" bgClass="bg-[#0891b2]/10 dark:bg-[#22d3ee]/10" />
        <SummaryCard icon={UserIcon} label="Usuarios" value={clientes.filter((c) => c.rol !== 'ADMIN' && c.rol !== 'STAFF').length} sub="Cuentas de tienda" textClass="text-[#22c55e]" bgClass="bg-[#22c55e]/10" />
        <SummaryCard icon={ShoppingBag} label="Admin / Staff" value={clientes.filter((c) => c.rol === 'ADMIN' || c.rol === 'STAFF').length} sub="Con acceso al panel" textClass="text-[#8b5cf6]" bgClass="bg-[#8b5cf6]/10" />
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Clientes registrados</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Buscar por email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-72 bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[#71717a] dark:text-[#52525b] font-semibold border-b border-black/[0.04] dark:border-white/[0.04] text-[10px] uppercase tracking-[0.15em] font-mono">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
              {filtrados.map((c) => (
                <tr key={c.id} className="hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-[#a1a1aa]">#{c.id}</td>
                  <td className="px-6 py-4 font-semibold text-[#0a0a0a] dark:text-[#fafafa]">{c.email || 'Sin email'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${
                      c.rol === 'ADMIN'
                        ? 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20'
                        : 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] border-[#0891b2]/20 dark:border-[#22d3ee]/20'
                    }`}>
                      {c.rol || 'USUARIO'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button onClick={() => eliminar(c.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-[#a1a1aa]">No se encontraron clientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, sub, textClass, bgClass }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; sub: string; textClass: string; bgClass: string }) {
  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl flex items-center gap-4 hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
      <div className={bgClass + ' p-3 rounded-xl ' + textClass}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] font-mono">{value}</p>
        <p className="text-[10px] text-[#a1a1aa] mt-1">{sub}</p>
      </div>
    </div>
  );
}
