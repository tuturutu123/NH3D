'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Leaf, MapPin, Truck, ShieldCheck, MessageCircle } from 'lucide-react';
import CartButton from './CartButton';
import SearchBar from './SearchBar';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="w-full">
      {/* Topbar Beige */}
      <div className="bg-[#f5f4ef] text-[#4a4a4a] text-xs py-2 border-b border-[#e5e5e5] hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Envíos a Villa Mercedes y zonas cercanas</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          
          {/* Logo Natura */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#324b3b]">
              <Leaf className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#324b3b] leading-none">NATURA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#324b3b] mt-0.5">Tienda de Productos</span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-700">
            <Link href="/" className="text-[#324b3b] font-semibold">Inicio</Link>
            <Link href="/productos" className="hover:text-[#324b3b] transition-colors">Productos</Link>
            <Link href="/ofertas" className="hover:text-[#324b3b] transition-colors">Ofertas</Link>
            <Link href="/novedades" className="hover:text-[#324b3b] transition-colors">Novedades</Link>
            <Link href="/quienes-somos" className="hover:text-[#324b3b] transition-colors">Quiénes somos</Link>
            <Link href="/contacto" className="hover:text-[#324b3b] transition-colors">Contacto</Link>
          </nav>

          {/* Iconos (Buscar + Carrito) */}
          <div className="flex items-center gap-4 text-gray-700">
            <Link href="/productos" aria-label="Buscar" className="p-2 hover:text-[#324b3b] transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}