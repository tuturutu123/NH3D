"use client";
import { useEffect, useState } from 'react';

interface PedidoItem {
  id: number;
  cantidad: number;
  precioUnit: number;
  producto?: { nombre?: string };
}

interface Pedido {
  id: number;
  creadoAt: string;
  total: number;
  estado: string;
  usuario?: { email?: string };
  items: PedidoItem[];
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pedidos')
      .then((r) => r.json())
      .then((data) => setPedidos(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <div>Cargando...</div>
        ) : pedidos.length === 0 ? (
          <div>No hay pedidos.</div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((p) => (
              <div key={p.id} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-sm text-gray-600">Pedido #{p.id} — {new Date(p.creadoAt).toLocaleString()}</div>
                    <div className="text-sm">Cliente: {p.usuario?.email || 'N/A'}</div>
                    <div className="text-sm">Total: ${p.total}</div>
                  </div>
                  <div className="text-sm">Estado: <strong>{p.estado}</strong></div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Items:</div>
                  <ul className="list-disc list-inside text-sm">
                    {p.items.map((it) => (
                      <li key={it.id}>{it.cantidad} x {it.producto?.nombre || 'Producto'} — ${it.precioUnit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}