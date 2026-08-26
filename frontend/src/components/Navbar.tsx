'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Box, MapPin, Menu, X } from 'lucide-react';
import CartButton from './CartButton';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full">
      {/* Topbar */}
      <div className="bg-[#f0f4f8] dark:bg-[#0a0a0a] text-[#52525b] dark:text-[#71717a] text-[11px] py-1.5 border-b border-black/[0.04] dark:border-white/[0.04] hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span className="font-mono tracking-wide">Envíos a todo el país · Retiro en local: 25 de Mayo 187, Villa María</span>
          </div>
        </div>
      </div>

      {/* Main Navbar - Floating Glass Pill */}
      <div className="sticky top-0 z-50 px-4 pt-3 pb-0">
        <div
          className={`mx-auto max-w-7xl flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-500 ${
            scrolled
              ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_20px_-4px_rgba(0,0,0,0.5)]'
              : 'bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-md border border-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#0891b2] dark:bg-[#22d3ee] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Box className="h-4 w-4 text-white dark:text-[#050505]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#0a0a0a] dark:text-[#fafafa] leading-none">NH3D</span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#71717a] dark:text-[#52525b] mt-0.5 font-mono">NHproducciones</span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Inicio' },
              { href: '/productos', label: 'Productos' },
              { href: '/ofertas', label: 'Ofertas' },
              { href: '/novedades', label: 'Novedades' },
              { href: '/quienes-somos', label: 'Nosotros' },
              { href: '/contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-[#52525b] dark:text-[#a1a1aa] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <Link href="/productos" aria-label="Buscar" className="p-2 text-[#71717a] dark:text-[#52525b] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-xl transition-all duration-200">
              <Search className="h-4 w-4" />
            </Link>
            <ThemeToggle />
            <CartButton />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#71717a] dark:text-[#52525b] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-xl transition-all duration-200"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-black/[0.04] dark:border-white/[0.06] rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)] overflow-hidden">
            <nav className="p-3 flex flex-col gap-0.5">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/productos', label: 'Productos' },
                { href: '/ofertas', label: 'Ofertas' },
                { href: '/novedades', label: 'Novedades' },
                { href: '/quienes-somos', label: 'Nosotros' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-3 text-[13px] font-medium text-[#52525b] dark:text-[#a1a1aa] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-black/[0.03] dark:hover:bg-white/[0.05] rounded-xl transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
