import Link from 'next/link';
import { Search, SearchX, ShoppingCart } from 'lucide-react';
import { catalogProducts, type CatalogProduct } from '../../lib/catalog';
import SmartImage from '../../components/SmartImage';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchProductos(q?: string) {
  try {
    const url = `${API_BASE}/productos${q ? `?q=${encodeURIComponent(q)}` : ''}`;
    const res = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(4000) });
    if (!res.ok) return catalogProducts;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : catalogProducts;
  } catch {
    return catalogProducts;
  }
}

export default async function ProductosPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawQ = params?.query ?? params?.q;
  const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ ?? '').trim().toLowerCase();
  const productos = await fetchProductos(q);
  const filtrados = q
    ? productos.filter((producto: CatalogProduct) => {
        const nombre = String(producto.nombre || '').toLowerCase();
        const categoria = String(producto.categoria?.nombre || producto.categoria || '').toLowerCase();
        return nombre.includes(q) || categoria.includes(q);
      })
    : productos;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#0891b2] dark:text-[#22d3ee] font-mono mb-1">Catálogo</p>
            <h1 className="text-4xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Productos</h1>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] px-4 py-3 shadow-sm w-full md:w-auto">
            <Search className="h-4 w-4 text-[#a1a1aa]" />
            <span className="text-sm text-[#71717a] dark:text-[#a1a1aa]">{q ? `Resultados para "${q}"` : `${filtrados.length} productos en stock`}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtrados.map((producto: CatalogProduct, i: number) => (
            <div
              key={producto.id}
              className="group animate-fade-in-up bg-white dark:bg-[#0a0a0a] rounded-2xl p-4 border border-black/[0.06] dark:border-white/[0.06] hover:shadow-lg hover:-translate-y-1 hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300"
              style={{ animationDelay: `${(i % 8) * 0.06}s` }}
            >
              <div className="h-40 mb-4 flex items-center justify-center rounded-xl bg-[#f5f5f5] dark:bg-white/[0.03] overflow-hidden">
                <SmartImage
                  src={producto.imagenUrl || '/categorias/default.svg'}
                  alt={producto.nombre}
                  className="max-h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-[#0891b2] dark:text-[#22d3ee] font-semibold mb-2 font-mono">{producto.categoria?.nombre || 'General'}</p>
              <h3 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-2 min-h-[48px]">{producto.nombre}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-extrabold text-[#0891b2] dark:text-[#22d3ee] font-mono">${Number(producto.precio).toLocaleString('es-AR')}</span>
                <span className={`text-xs font-medium ${producto.stock > 0 ? 'text-[#22c55e] dark:text-[#4ade80]' : 'text-[#ef4444]'}`}>
                  {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                </span>
              </div>

              <div className="flex gap-2">
                <Link href={`/productos/${producto.id}`} className="flex-1 bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] py-2.5 rounded-xl text-center font-semibold active:scale-[0.98] transition-all duration-300">
                  Ver
                </Link>
                <Link href={`/carrito`} className="w-12 border border-black/[0.06] dark:border-white/[0.06] rounded-xl flex items-center justify-center text-[#0891b2] dark:text-[#22d3ee] hover:bg-[#0891b2]/10 dark:hover:bg-[#22d3ee]/10 active:scale-[0.95] transition-all duration-300" aria-label="Agregar al carrito">
                  <ShoppingCart className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div className="mt-10 text-center bg-white dark:bg-[#0a0a0a] rounded-2xl border border-black/[0.06] dark:border-white/[0.06] py-12 animate-fade-in-up">
            <SearchX className="h-10 w-10 text-[#a1a1aa] mx-auto mb-3" />
            <p className="text-[#71717a] dark:text-[#a1a1aa] text-lg">No encontramos productos para tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
