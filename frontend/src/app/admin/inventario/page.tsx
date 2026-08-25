"use client";
import { useEffect, useState } from 'react';

interface ProductoInventario {
  id: number;
  nombre?: string;
  stock: number;
}

export default function AdminInventario() {
  const [productos, setProductos] = useState<ProductoInventario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/inventario/productos')
      .then((r) => r.json())
      .then((data) => setProductos(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const updateStock = async (id: number) => {
    const nuevo = Number(prompt('Nuevo stock') || '0');
    if (isNaN(nuevo)) return;
    await fetch(`/api/inventario/producto/${id}/stock`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stock: nuevo }) });
    setProductos((p) => p.map((prod) => prod.id === id ? { ...prod, stock: nuevo } : prod));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Inventario</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {loading ? <div>Cargando...</div> : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2">ID</th>
                <th className="py-2">Nombre</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 text-sm">{p.id}</td>
                  <td className="py-2 text-sm">{p.nombre}</td>
                  <td className="py-2 text-sm">{p.stock}</td>
                  <td className="py-2 text-sm"><button onClick={() => updateStock(p.id)} className="text-sm text-green-700">Actualizar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}