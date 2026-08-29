/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { MessageSquare, Trash2, Star } from 'lucide-react';

interface Valoracion {
  id: number;
  rating: number;
  comentario?: string | null;
  creadoAt: string;
  producto?: { id: number; nombre?: string; imagenUrl?: string | null };
  usuario?: { id: number; email?: string };
}

export default function AdminValoracionesPage() {
  const [valoraciones, setValoraciones] = useState<Valoracion[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

  const cargar = async () => {
    try {
      const res = await api.get('/valoraciones');
      setValoraciones(res.data);
    } catch (err) {
      console.error('Error al cargar valoraciones', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta valoración?')) return;
    try {
      await api.delete(`/valoraciones/${id}`);
      setValoraciones((v) => v.filter((x) => x.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'No se pudo eliminar la valoración.');
    }
  };

  const promedio =
    valoraciones.length > 0
      ? (valoraciones.reduce((acc, v) => acc + v.rating, 0) / valoraciones.length).toFixed(1)
      : '0.0';

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  return (
    <div className="max-w-350 mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Valoraciones</h1>
          <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Opiniones y calificaciones de tus clientes</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] font-mono">{promedio} <span className="text-[#fbbf24]">★</span></p>
          <p className="text-[11px] text-[#a1a1aa] font-mono uppercase tracking-wide mt-1">Promedio · {valoraciones.length} valoraciones</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-sm overflow-hidden">
        {valoraciones.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="h-10 w-10 text-[#a1a1aa]/40 mb-3" />
            <p className="text-[#a1a1aa] font-medium">No hay valoraciones todavía.</p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {valoraciones.map((v) => (
              <div key={v.id} className="p-6 flex items-start gap-4 hover:bg-black/[0.01] dark:hover:bg-white/[0.02] transition-colors">
                <div className="h-11 w-11 rounded-xl bg-[#f5f5f5] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] overflow-hidden shrink-0 flex items-center justify-center p-1">
                  {v.producto?.imagenUrl ? (
                    <img src={v.producto.imagenUrl.startsWith('http') ? v.producto.imagenUrl : `${backendUrl}${v.producto.imagenUrl}`} alt={v.producto.nombre || ''} className="h-full w-full object-contain" />
                  ) : (
                    <MessageSquare className="h-5 w-5 text-[#a1a1aa]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] truncate">{v.producto?.nombre || `Producto #${v.producto?.id}`}</span>
                      <span className="font-mono text-[10px] text-[#a1a1aa]">#{v.id}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`h-4 w-4 ${n <= v.rating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'text-[#a1a1aa]/25'}`} />
                        ))}
                      </div>
                      <button onClick={() => handleEliminar(v.id)} className="p-1.5 text-[#a1a1aa] hover:text-[#ef4444] border border-black/[0.04] dark:border-white/[0.06] rounded-lg hover:bg-[#ef4444]/10 transition-all duration-200" title="Eliminar"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  {v.comentario && (
                    <p className="mt-2 text-sm text-[#52525b] dark:text-[#d4d4d8]">{v.comentario}</p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-[#a1a1aa]">
                    <span className="font-medium">{v.usuario?.email || 'Anónimo'}</span>
                    <span>·</span>
                    <span className="font-mono">{new Date(v.creadoAt).toLocaleDateString('es-AR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
