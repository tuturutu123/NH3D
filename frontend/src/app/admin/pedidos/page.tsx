/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { ShoppingCart, Search, Package, Truck, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';

interface PedidoItem {
  id: number;
  cantidad: number;
  precioUnit: number;
  producto?: { id: number; nombre?: string };
}

interface Pedido {
  id: number;
  creadoAt: string;
  total: number;
  estado: string;
  usuario?: { id: number; email?: string };
  envio?: { id: number; metodo: string; costo: number; tracking?: string | null; estado: string } | null;
  items: PedidoItem[];
}

const estadoEstilo: Record<string, string> = {
  PENDIENTE: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20',
  EN_TRANSITO: 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] border-[#0891b2]/20 dark:border-[#22d3ee]/20',
  ENTREGADO: 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20',
  CANCELADO: 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20',
};

export default function AdminPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [abierto, setAbierto] = useState<number | null>(null);

  const cargar = async () => {
    try {
      const res = await api.get('/pedidos');
      setPedidos(res.data);
    } catch (err) {
      console.error('Error al cargar pedidos', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const filtrados = pedidos.filter((p) => {
    const q = busqueda.toLowerCase();
    return (
      String(p.id).includes(q) ||
      (p.usuario?.email || '').toLowerCase().includes(q)
    );
  });

  const totalVentas = pedidos.reduce((acc, p) => acc + p.total, 0);
  const porEstado = (estado: string) => pedidos.filter((p) => p.estado === estado).length;

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Pedidos</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Historial y detalle de compras de tus clientes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <TinyStat icon={ShoppingCart} label="Pedidos" valor={pedidos.length} color="text-[#0891b2] dark:text-[#22d3ee]" />
        <TinyStat icon={CreditCard} label="Facturado" valor={'$' + totalVentas.toLocaleString('es-AR')} color="text-[#22c55e]" />
        <TinyStat icon={Package} label="Pendientes" valor={porEstado('PENDIENTE')} color="text-[#f59e0b]" />
        <TinyStat icon={Truck} label="En tránsito" valor={porEstado('EN_TRANSITO')} color="text-[#06b6d4]" />
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Listado de pedidos</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Buscar por ID o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-72 bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart className="h-10 w-10 text-[#a1a1aa]/40 mb-3" />
            <p className="text-[#a1a1aa] font-medium">No hay pedidos registrados.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtrados.map((p) => (
              <div key={p.id}>
                <button
                  onClick={() => setAbierto(abierto === p.id ? null : p.id)}
                  className="w-full p-5 flex items-center gap-4 text-left hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Pedido #{p.id}</span>
                      <span className="font-mono text-[10px] text-[#a1a1aa]">· {new Date(p.creadoAt).toLocaleDateString('es-AR')}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#52525b] dark:text-[#a1a1aa]">
                      <span>{p.usuario?.email || 'Cliente no identificado'}</span>
                      <span className="font-mono">{p.items.length} item(s)</span>
                      <span className="font-mono font-bold text-[#0891b2] dark:text-[#22d3ee]">{'$'}{p.total.toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`rounded-xl border px-3 py-1.5 text-[10px] font-mono font-bold ${estadoEstilo[p.estado] || estadoEstilo.PENDIENTE}`}>{p.estado}</span>
                    {abierto === p.id ? <ChevronUp className="h-4 w-4 text-[#a1a1aa]" /> : <ChevronDown className="h-4 w-4 text-[#a1a1aa]" />}
                  </div>
                </button>
                {abierto === p.id && (
                  <div className="px-6 pb-5">
                    <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] p-4">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 text-sm text-[#52525b] dark:text-[#a1a1aa]">
                        <span className="inline-flex items-center gap-1.5"><Package className="h-4 w-4 text-[#0891b2] dark:text-[#22d3ee]" /> {p.envio ? `${p.envio.metodo} · $${p.envio.costo.toLocaleString('es-AR')}` : 'Sin envío'}</span>
                        {p.envio?.tracking && <span className="font-mono">Tracking: {p.envio.tracking}</span>}
                      </div>
                      <ul className="space-y-2">
                        {(p.items).map((it) => (
                          <li key={it.id} className="flex items-center justify-between text-sm">
                            <span className="text-[#0a0a0a] dark:text-[#fafafa]">{it.cantidad} × {it.producto?.nombre || 'Producto'}</span>
                            <span className="font-mono text-[#52525b] dark:text-[#a1a1aa]">{'$'}{it.precioUnit.toLocaleString('es-AR')}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-black/[0.04] dark:border-white/[0.06] mt-4 pt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Total</span>
                        <span className="font-mono font-bold text-[#0891b2] dark:text-[#22d3ee]">{'$'}{p.total.toLocaleString('es-AR')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TinyStat({ icon: Icon, label, valor, color }: { icon: React.ComponentType<{ className?: string }>; label: string; valor: number | string; color: string }) {
  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${color}`} />
        <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide">{label}</p>
      </div>
      <p className={`text-2xl font-bold font-mono ${color}`}>{valor}</p>
    </div>
  );
}
