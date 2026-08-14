import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { catalogProducts } from '../../lib/catalog';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchProductos(q?: string) {
  try {
    const url = `${API_BASE}/productos${q ? `?q=${encodeURIComponent(q)}` : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return catalogProducts;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : catalogProducts;
  } catch {
    return catalogProducts;
  }
}

export default async function ProductosPage({ searchParams }: { searchParams?: any }) {
  const params = await searchParams;
  const q = (params?.query || params?.q || '').trim().toLowerCase();
  const productos = await fetchProductos(q);
  const filtrados = q
    ? productos.filter((producto: any) => {
        const nombre = String(producto.nombre || '').toLowerCase();
        const categoria = String(producto.categoria?.nombre || producto.categoria || '').toLowerCase();
        return nombre.includes(q) || categoria.includes(q);
      })
    : productos;

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#627653] font-semibold">Catálogo</p>
            <h1 className="text-4xl font-extrabold text-[#2a3c2e]">Productos</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-[#e2dfd3] bg-white px-4 py-3 shadow-sm w-full md:w-auto">
            <Search className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{q ? `Resultados para "${q}"` : `${filtrados.length} productos en stock`}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtrados.map((producto: any) => (
            <div key={producto.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#ece7dc] hover:shadow-lg transition-all duration-200">
              <div className="h-40 mb-4 flex items-center justify-center rounded-xl bg-[#f6f4ef] overflow-hidden">
                {producto.imagenUrl ? (
                  <img src={producto.imagenUrl} alt={producto.nombre} className="max-h-full object-contain p-2" />
                ) : (
                  <div className="text-sm text-gray-400">Sin imagen</div>
                )}
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#6c7b69] font-semibold mb-2">{producto.categoria?.nombre || 'General'}</p>
              <h3 className="text-lg font-bold text-[#2a3c2e] mb-2 min-h-[48px]">{producto.nombre}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-extrabold text-[#2a3c2e]">${Number(producto.precio).toLocaleString('es-AR')}</span>
                <span className={`text-xs font-medium ${producto.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/productos/${producto.id}`} className="flex-1 bg-[#324b3b] text-white py-2.5 rounded-full text-center font-semibold hover:bg-[#24382d] transition-colors">
                  Ver
                </Link>
                <Link href={`/carrito`} className="w-12 border border-[#dfe5de] rounded-full flex items-center justify-center text-[#324b3b] hover:bg-[#f1f4ee] transition-colors" aria-label="Agregar al carrito">
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="mt-10 text-center bg-white rounded-2xl border border-[#ece7dc] py-10">
            <p className="text-gray-600 text-lg">No encontramos productos para tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

