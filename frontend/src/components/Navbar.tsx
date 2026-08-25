'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Box, MapPin, Menu, X } from 'lucide-react';
import CartButton from './CartButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Topbar */}
      <div className="bg-[#edf3f9] dark:bg-[#1a2332] text-[#4a4a4a] dark:text-gray-400 text-xs py-2 border-b border-[#e5e5e5] dark:border-gray-700 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Envíos a todo el país · Retiro en local: 25 de Mayo 187, Villa María</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white dark:bg-[#111827] sticky top-0 z-50 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between max-w-7xl">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-[#154971] dark:text-[#22d3ee]">
              <Box className="h-7 w-7 md:h-8 md:w-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight text-[#154971] dark:text-[#22d3ee] leading-none">NH3D</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#154971] dark:text-[#22d3ee] mt-0.5">NHproducciones · Diseño e Impresión 3D</span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-700 dark:text-gray-300">
            <Link href="/" className="text-[#154971] dark:text-[#22d3ee] font-semibold">Inicio</Link>
            <Link href="/productos" className="hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">Productos</Link>
            <Link href="/ofertas" className="hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">Ofertas</Link>
            <Link href="/novedades" className="hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">Novedades</Link>
            <Link href="/quienes-somos" className="hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">Quiénes somos</Link>
            <Link href="/contacto" className="hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">Contacto</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1.5 md:gap-2 text-gray-700 dark:text-gray-300">
            <Link href="/productos" aria-label="Buscar" className="p-2 hover:text-[#154971] dark:hover:text-[#22d3ee] transition-colors">
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle />
            <CartButton />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/productos', label: 'Productos' },
              { href: '/ofertas', label: 'Ofertas' },
              { href: '/novedades', label: 'Novedades' },
              { href: '/quienes-somos', label: 'Quiénes somos' },
              { href: '/contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
