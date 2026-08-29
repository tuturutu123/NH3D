/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Package, Search, AlertTriangle, Boxes, Check, X, PackagePlus, PackageX } from 'lucide-react';

interface ProductoStock {
  id: number;
  nombre?: string;
  precio: number;
  stock: number;
  estado?: boolean;
  imagenUrl?: string | null;
}

export default function AdminInventarioPage() {
  const [productos, setProductos] = useState<ProductoStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [nuevoStock, setNuevoStock] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  const cargar = async () => {
    try {
      const res = await api.get('/inventario/productos');
      setProductos(res.data);
    } catch (err) {
      console.error('Error al cargar inventario', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardarStock = async (id: number) => {
    const stock = parseInt(nuevoStock, 10);
    if (isNaN(stock) || stock < 0) return;
    try {
      await api.patch(`/inventario/producto/${id}/stock`, { stock });
      setProductos((list) => list.map((p) => (p.id === id ? { ...p, stock } : p)));
      setEditId(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al actualizar el stock');
    }
  };

  const sinStock = productos.filter((p) => p.stock <= 0).length;
  const bajoStock = productos.filter((p) => p.stock > 0 && p.stock < 5).length;
  const valorTotal = productos.reduce((acc, p) => acc + p.precio * Math.max(0, p.stock), 0);
  const filtrados = productos.filter((p) => (p.nombre || '').toLowerCase().includes(busqueda.toLowerCase()));

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Inventario</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Control de stock y valor del catálogo</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <TinyStat icon={Boxes} label="Productos" valor={productos.length} color="text-[#0891b2] dark:text-[#22d3ee]" />
        <TinyStat icon={PackagePlus} label="Valor inventario" valor={'$' + valorTotal.toLocaleString('es-AR')} color="text-[#22c55e]" />
        <TinyStat icon={AlertTriangle} label="Stock bajo" valor={bajoStock} color="text-[#f59e0b]" />
        <TinyStat icon={PackageX} label="Sin stock" valor={sinStock} color="text-[#ef4444]" />
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">Productos en existencia</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-72 bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="h-10 w-10 text-[#a1a1aa]/40 mb-3" />
            <p className="text-[#a1a1aa] font-medium">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtrados.map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                <div className="h-12 w-12 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center p-1">
                  {p.imagenUrl ? (
                    <img src={p.imagenUrl.startsWith('http') ? p.imagenUrl : `${backendUrl}${p.imagenUrl}`} alt={p.nombre || ''} className="h-full w-full object-contain" />
                  ) : (
                    <Package className="h-5 w-5 text-[#a1a1aa]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] truncate">{p.nombre || `Producto #${p.id}`}</span>
                    <span className="font-mono text-[10px] text-[#a1a1aa]">#{p.id}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono font-bold text-[#0891b2] dark:text-[#22d3ee] text-sm">{'$'}{p.precio.toLocaleString('es-AR')}</span>
                    {p.stock <= 0 ? (
                      <span className="text-[10px] font-mono text-[#ef4444]">Sin stock</span>
                    ) : p.stock < 5 ? (
                      <span className="text-[10px] font-mono text-[#f59e0b]">Stock bajo ({p.stock})</span>
                    ) : null}
                  </div>
                </div>
                {editId === p.id ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      autoFocus
                      value={nuevoStock}
                      onChange={(e) => setNuevoStock(e.target.value)}
                      type="number"
                      min={0}
                      className="w-20 rounded-lg border border-black/[0.06] dark:border-white/[0.06] px-3 py-1.5 text-sm font-mono focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa]"
                    />
                    <button onClick={() => guardarStock(p.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#22c55e] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#22c55e]/10 transition-all duration-200" title="Guardar"><Check className="h-4 w-4" /></button>
                    <button onClick={() => setEditId(null)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Cancelar"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`rounded-xl border px-3 py-2 text-xs font-mono font-bold ${
                      p.stock <= 0
                        ? 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20'
                        : p.stock < 5
                          ? 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20'
                          : 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20'
                    }`}>
                      {p.stock} en stock
                    </span>
                    <button onClick={() => { setEditId(p.id); setNuevoStock(String(p.stock)); }} className="px-3 py-1.5 text-xs font-semibold text-[#0891b2] dark:text-[#22d3ee] border border-[#0891b2]/20 dark:border-[#22d3ee]/20 rounded-lg hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 transition-colors">Editar</button>
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
