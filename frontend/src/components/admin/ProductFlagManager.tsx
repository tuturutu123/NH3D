/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { Search, Star, BadgePercent, StarOff, SearchX } from 'lucide-react';

interface ProductoConFlag {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  oferta: boolean;
  destacado: boolean;
  imagenUrl: string | null;
  categoria?: { id: number; nombre: string };
}

export default function ProductFlagManager({ flag }: { flag: 'oferta' | 'destacado' }) {
  const router = useRouter();
  const isOferta = flag === 'oferta';
  const [productos, setProductos] = useState<ProductoConFlag[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [updating, setUpdating] = useState<number | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  const cargar = async () => {
    try {
      const res = await api.get('/productos?all=true');
      setProductos(res.data);
    } catch (err) {
      console.error('Error al cargar productos', err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const activos = productos.filter((p) => (isOferta ? p.oferta : p.destacado));
  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const toggleFlag = async (p: ProductoConFlag) => {
    setUpdating(p.id);
    try {
      const payload: {
        nombre: string;
        precio: number;
        stock: number;
        estado: boolean;
        destacado: boolean;
        oferta: boolean;
        categoriaId?: number;
      } = {
        nombre: p.nombre,
        precio: p.precio,
        stock: p.stock,
        estado: true,
        destacado: p.destacado,
        oferta: p.oferta,
        categoriaId: p.categoria?.id,
      };
      if (isOferta) {
        payload.oferta = !payload.oferta;
      } else {
        payload.destacado = !payload.destacado;
      }
      await api.patch(`/productos/${p.id}`, payload);
      await cargar();
    } catch (err) {
      console.error('Error al actualizar producto', err);
    } finally {
      setUpdating(null);
    }
  };

  if (cargando) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  const Icono = isOferta ? BadgePercent : Star;

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">
            {isOferta ? 'Ofertas' : 'Novedades'}
          </h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">
            {isOferta
              ? 'Productos destacados con descuento'
              : 'Productos destacados en la tienda'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard titulo={isOferta ? 'En oferta' : 'Destacados'} valor={activos.length} color="#0891b2" />
        <SummaryCard titulo="Total productos" valor={productos.length} color="#71717a" />
        <SummaryCard titulo="Con stock" valor={productos.filter((p) => p.stock > 0).length} color="#22c55e" />
        <SummaryCard titulo="Agotados" valor={productos.filter((p) => p.stock <= 0).length} color="#ef4444" />
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa]">{activos.length} productos activos</h2>
            <p className="text-sm text-[#a1a1aa] mt-0.5">Activá o desactivá el flag {isOferta ? 'de oferta' : 'de novedad'} para cada producto</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 border border-black/[0.06] dark:border-white/[0.06] rounded-xl text-sm w-full md:w-72 bg-[#fafafa] dark:bg-white/[0.03] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]"
            />
          </div>
        </div>

        {filtrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <SearchX className="h-10 w-10 text-[#a1a1aa]/40 mb-3" />
            <p className="text-[#a1a1aa] font-medium">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {filtrados.map((p) => {
              const active = isOferta ? p.oferta : p.destacado;
              return (
                <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                  <div className="h-12 w-12 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center p-1">
                    {p.imagenUrl ? (
                      <img src={p.imagenUrl.startsWith('http') ? p.imagenUrl : `${backendUrl}${p.imagenUrl}`} alt={p.nombre} className="h-full w-full object-contain" />
                    ) : (
                      <Star className="h-5 w-5 text-[#a1a1aa]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] truncate">{p.nombre}</span>
                      {p.categoria && (
                        <span className="text-[10px] text-[#a1a1aa] font-mono hidden sm:inline">{p.categoria.nombre}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-mono font-bold text-[#0891b2] dark:text-[#22d3ee] text-sm">{'$'}{p.precio.toLocaleString('es-AR')}</span>
                      <span className={p.stock > 0 ? 'text-[10px] font-mono text-[#22c55e]' : 'text-[10px] font-mono text-[#ef4444]'}>
                        {p.stock > 0 ? `${p.stock} en stock` : 'Sin stock'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFlag(p)}
                    disabled={updating === p.id}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 disabled:opacity-50 ${
                      active
                        ? 'bg-[#0891b2]/10 dark:bg-[#22d3ee]/10 text-[#0891b2] dark:text-[#22d3ee] border-[#0891b2]/20 dark:border-[#22d3ee]/20'
                        : 'bg-white dark:bg-transparent text-[#71717a] border-black/[0.08] dark:border-white/[0.08] hover:border-[#0891b2]/30'
                    }`}
                  >
                    <Icono className={`h-4 w-4 ${!active ? 'opacity-40' : ''}`} />
                    {active ? 'Quitar' : 'Activar'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {activos.length === 0 && !cargando && (
        <div className="flex items-center gap-3 bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <StarOff className="h-5 w-5 text-[#a1a1aa]" />
          <p className="text-sm text-[#52525b] dark:text-[#a1a1aa]">
            Todavía no hay productos {isOferta ? 'en oferta' : 'destacados'}. Usá el buscador y activá el flag en alguno.
          </p>
          <button
            onClick={() => router.push('/admin')}
            className="ml-auto text-sm font-semibold text-[#0891b2] dark:text-[#22d3ee]"
          >
            Ir a productos →
          </button>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ titulo, valor, color }: { titulo: string; valor: number; color: string }) {
  return (
    <div className="bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] p-5 rounded-2xl flex items-center gap-4 hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
      <div className="flex flex-col">
        <p className="text-[11px] text-[#71717a] dark:text-[#52525b] font-mono uppercase tracking-wide mb-0.5">{titulo}</p>
        <p className="text-2xl font-bold font-mono" style={{ color }}>{valor}</p>
      </div>
    </div>
  );
}
