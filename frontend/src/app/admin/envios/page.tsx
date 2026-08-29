/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Truck, Search } from 'lucide-react';

interface Envio {
  id: number;
  pedidoId: number;
  metodo: string;
  costo: number;
  tracking?: string | null;
  estado: string;
  pedido?: { id: number; total: number; estado: string; creadoAt: string };
}

const ESTADOS = ['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'] as const;

const estadoEstilo: Record<string, string> = {
  PENDIENTE: 'bg-[#f59e0b]/10 text-[#f59e0b]',
  EN_TRANSITO: 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee]',
  ENTREGADO: 'bg-[#22c55e]/10 text-[#22c55e]',
  CANCELADO: 'bg-[#ef4444]/10 text-[#ef4444]',
};

export default function AdminEnviosPage() {
  const [envios, setEnvios] = useState<Envio[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [trackingEditar, setTrackingEditar] = useState<number | null>(null);

  const cargar = async () => {
    try {
      const res = await api.get('/envios');
      setEnvios(res.data);
    } catch (err) {
      console.error('Error al cargar envíos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const cambiarEstado = async (e: Envio, estado: string, tracking: string) => {
    try {
      await api.patch(`/envios/${e.id}`, { estado, tracking });
      cargar();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar el envío');
    }
  };

  const filtrados = envios.filter((e) => {
    const q = busqueda.toLowerCase();
    return (
      String(e.id).includes(q) ||
      String(e.pedidoId).includes(q) ||
      (e.tracking || '').toLowerCase().includes(q)
    );
  });

  const porEstado = (estado: string) => envios.filter((e) => e.estado === estado).length;

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Envíos</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Gestioná el seguimiento de tus pedidos</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <TinyStat label="Envíos" valor={envios.length} color="text-[#0891b2] dark:text-[#22d3ee]" />
        <TinyStat label="Pendientes" valor={porEstado('PENDIENTE')} color="text-[#f59e0b]" />
        <TinyStat label="En tránsito" valor={porEstado('EN_TRANSITO')} color="text-[#06b6d4]" />
        <TinyStat label="Entregados" valor={porEstado('ENTREGADO')} color="text-[#22c55e]" />
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Listado de envíos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Buscar por ID o tracking..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-72 bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Truck className="h-10 w-10 text-[#a1a1aa]/40 mb-3" />
            <p className="text-[#a1a1aa] font-medium">No hay envíos registrados.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtrados.map((e) => (
              <div key={e.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee]" />
                    <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Envío #{e.id}</span>
                    <span className="text-[10px] text-[#a1a1aa] font-mono">Pedido #{e.pedidoId}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-[#52525b] dark:text-[#a1a1aa]">
                    <span>Método: <strong className="text-[#0a0a0a] dark:text-[#fafafa]">{e.metodo}</strong></span>
                    <span className="font-mono">Costo: {'$'}{e.costo.toLocaleString('es-AR')}</span>
                    {e.pedido && (
                      <>
                        <span className="font-mono">Total pedido: {'$'}{e.pedido.total.toLocaleString('es-AR')}</span>
                        <span className="font-mono text-[#a1a1aa]">· {new Date(e.pedido.creadoAt).toLocaleDateString('es-AR')}</span>
                      </>
                    )}
                  </div>
                  {trackingEditar === e.id ? (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        autoFocus
                        defaultValue={e.tracking || ''}
                        id={`tracking-${e.id}`}
                        className="w-64 rounded-lg border border-black/[0.06] dark:border-white/[0.06] px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa]"
                      />
                      <button onClick={() => cambiarEstado(e, e.estado, (document.getElementById(`tracking-${e.id}`) as HTMLInputElement)?.value || '')} className="px-3 py-1.5 text-xs font-semibold bg-[#0891b2] dark:bg-[#22d3ee] text-white dark:text-[#050505] rounded-lg transition-colors">Guardar</button>
                      <button onClick={() => setTrackingEditar(null)} className="px-3 py-1.5 text-xs font-semibold text-[#a1a1aa] border border-black/[0.06] dark:border-white/[0.06] rounded-lg hover:bg-black/[0.02] transition-colors">Cancelar</button>
                    </div>
                  ) : (
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-[#a1a1aa]">
                      <span className="font-mono">{e.tracking ? `Tracking: ${e.tracking}` : 'Sin tracking'}</span>
                      <button onClick={() => setTrackingEditar(e.id)} className="font-semibold text-[#0891b2] dark:text-[#22d3ee] hover:underline">Editar</button>
                    </div>
                  )}
                </div>
                <select
                  value={e.estado}
                  onChange={(ev) => cambiarEstado(e, ev.target.value, e.tracking || '')}
                  className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-mono font-bold focus:outline-none cursor-pointer ${estadoEstilo[e.estado] || estadoEstilo.PENDIENTE}`}
                >
                  {ESTADOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TinyStat({ label, valor, color }: { label: string; valor: number; color: string }) {
  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl">
      <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold font-mono ${color}`}>{valor}</p>
    </div>
  );
}
