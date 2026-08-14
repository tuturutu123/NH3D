"use client";
import { useEffect, useState } from 'react';

export default function AdminClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/usuarios')
      .then((r) => r.json())
      .then((data) => setClientes(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminar usuario?')) return;
    await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
    setClientes((c) => c.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2">ID</th>
                <th className="py-2">Email</th>
                <th className="py-2">Rol</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-2 text-sm">{c.id}</td>
                  <td className="py-2 text-sm">{c.email}</td>
                  <td className="py-2 text-sm">{c.rol}</td>
                  <td className="py-2 text-sm">
                    <button onClick={() => handleDelete(c.id)} className="text-sm text-red-600">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}