'use client';

import Link from 'next/link';
import { Search, Leaf, MapPin } from 'lucide-react';
import CartButton from './CartButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="w-full">
      {/* Topbar */}
      <div className="bg-[#f5f4ef] dark:bg-[#1a2332] text-[#4a4a4a] dark:text-gray-400 text-xs py-2 border-b border-[#e5e5e5] dark:border-gray-700 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Envíos a Villa Mercedes y zonas cercanas</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white dark:bg-[#111827] sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#324b3b] dark:text-[#6ba368]">
              <Leaf className="h-8 w-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#324b3b] dark:text-[#6ba368] leading-none">NATURA</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#324b3b] dark:text-[#6ba368] mt-0.5">Tienda de Productos</span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-700 dark:text-gray-300">
            <Link href="/" className="text-[#324b3b] dark:text-[#6ba368] font-semibold">Inicio</Link>
            <Link href="/productos" className="hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">Productos</Link>
            <Link href="/ofertas" className="hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">Ofertas</Link>
            <Link href="/novedades" className="hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">Novedades</Link>
            <Link href="/quienes-somos" className="hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">Quiénes somos</Link>
            <Link href="/contacto" className="hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">Contacto</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Link href="/productos" aria-label="Buscar" className="p-2 hover:text-[#324b3b] dark:hover:text-[#6ba368] transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
