'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, PackageX } from 'lucide-react';

interface Resumen {
  totalVentas: number;
  pedidosCount: number;
  productosCount: number;
  clientesCount: number;
}

interface Pedido {
  id: number;
  total: number;
  estado: string;
  creadoAt: string;
  items: { id: number; cantidad: number; producto: { id: number; nombre: string } }[];
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  oferta: boolean;
  destacado: boolean;
  imagenUrl?: string | null;
}

const estadoColor: Record<string, string> = {
  PENDIENTE: 'text-[#f59e0b] bg-[#f59e0b]/10',
  EN_TRANSITO: 'text-[#0891b2] dark:text-[#22d3ee] bg-[#0891b2]/10 dark:bg-[#22d3ee]/10',
  ENTREGADO: 'text-[#22c55e] bg-[#22c55e]/10',
  CANCELADO: 'text-[#ef4444] bg-[#ef4444]/10',
};

export default function AdminReportesPage() {
  const [resumen, setResumen] = useState<Resumen | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [r, p, pr] = await Promise.all([
          api.get('/reportes/resumen'),
          api.get('/pedidos'),
          api.get('/productos?all=true'),
        ]);
        setResumen(r.data);
        setPedidos(p.data);
        setProductos(pr.data);
      } catch (err) {
        console.error('Error al cargar reportes', err);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  if (cargando || !resumen) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  const valorInventario = productos.reduce((acc, p) => acc + p.precio * Math.max(0, p.stock), 0);
  const sinStock = productos.filter((p) => p.stock <= 0).length;
  const enOferta = productos.filter((p) => p.oferta).length;
  const destacados = productos.filter((p) => p.destacado).length;

  const topProductos = [...productos]
    .sort((a, b) => b.precio - a.precio)
    .slice(0, 5);

  const ventasPorEstado = pedidos.reduce<Record<string, number>>((acc, p) => {
    acc[p.estado] = (acc[p.estado] || 0) + p.total;
    return acc;
  }, {});

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Reportes</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Métricas y resumen de tu tienda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={DollarSign} label="Ventas totales" value={'$' + resumen.totalVentas.toLocaleString('es-AR')} sub="Suma de todos los pedidos" accent />
        <StatCard icon={ShoppingCart} label="Pedidos" value={resumen.pedidosCount} sub="Pedidos registrados" />
        <StatCard icon={Package} label="Productos" value={resumen.productosCount} sub="En el catálogo" green />
        <StatCard icon={Users} label="Clientes" value={resumen.clientesCount} sub="Cuentas registradas" purple />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] dark:border-white/[0.04]">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Inventario</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.04] dark:bg-white/[0.04]">
            <MiniStat label="Valor inventario" value={'$' + valorInventario.toLocaleString('es-AR')} color="text-[#0891b2] dark:text-[#22d3ee]" />
            <MiniStat label="Sin stock" value={String(sinStock)} color="text-[#ef4444]" />
            <MiniStat label="En oferta" value={String(enOferta)} color="text-[#8b5cf6]" />
            <MiniStat label="Destacados" value={String(destacados)} color="text-[#f59e0b]" />
          </div>
          <div className="p-6">
            <h3 className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-4">Productos por precio (top 5)</h3>
            <div className="space-y-3">
              {topProductos.map((p) => {
                const max = Math.max(...productos.map((x) => x.precio), 1);
                const pct = Math.round((p.precio / max) * 100);
                return (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#52525b] dark:text-[#a1a1aa] truncate">{p.nombre}</span>
                        <span className="font-mono font-semibold text-[#0a0a0a] dark:text-[#fafafa]">{'$'}{p.precio.toLocaleString('es-AR')}</span>
                      </div>
                      <div className="h-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#0891b2] to-[#22d3ee] dark:from-[#22d3ee] dark:to-[#67e8f9]" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] dark:border-white/[0.04]">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Ventas por estado</h2>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(ventasPorEstado).length === 0 ? (
              <p className="text-sm text-[#a1a1aa] text-center py-6">No hay pedidos todavía.</p>
            ) : (
              Object.entries(ventasPorEstado).map(([estado, total]) => (
                <div key={estado} className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${estadoColor[estado] || 'text-[#a1a1aa] bg-[#a1a1aa]/10'}`}>{estado}</span>
                  <span className="font-mono font-bold text-[#0a0a0a] dark:text-[#fafafa]">{'$'}{total.toLocaleString('es-AR')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-4 bg-[#f59e0b]/10 dark:bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-2xl p-5">
          <TrendingUp className="h-6 w-6 text-[#f59e0b]" />
          <div>
            <p className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Ticket promedio</p>
            <p className="font-mono text-xl font-bold text-[#f59e0b] mt-0.5">
              {resumen.pedidosCount > 0 ? '$' + Math.round(resumen.totalVentas / resumen.pedidosCount).toLocaleString('es-AR') : '$0'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#ef4444]/10 dark:bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-2xl p-5">
          <PackageX className="h-6 w-6 text-[#ef4444]" />
          <div>
            <p className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Productos agotados</p>
            <p className="font-mono text-xl font-bold text-[#ef4444] mt-0.5">{sinStock}</p>
            {sinStock === 0 && <p className="text-xs text-[#a1a1aa]">Todo en stock, perfecto.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent, green, purple }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number | string; sub: string; accent?: boolean; green?: boolean; purple?: boolean }) {
  const textClass = accent ? 'text-[#0891b2] dark:text-[#22d3ee]' : green ? 'text-[#22c55e]' : purple ? 'text-[#8b5cf6]' : 'text-[#71717a]';
  const bgClass = accent ? 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10' : green ? 'bg-[#22c55e]/10' : purple ? 'bg-[#8b5cf6]/10' : 'bg-[#71717a]/10';
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

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white dark:bg-[#0a0a0a] p-5">
      <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
    </div>
  );
}
