import Link from 'next/link';
import { Phone, MapPin, Mail, Box, Clock, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#a1a1aa] pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#22d3ee] flex items-center justify-center">
                <Box className="h-4.5 w-4.5 text-[#050505]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#fafafa] leading-none">NH3D</span>
                <span className="text-[8px] uppercase tracking-[0.25em] text-[#52525b] mt-0.5 font-mono">NHproducciones</span>
              </div>
            </div>
            <p className="text-sm text-[#71717a] leading-relaxed mb-6">
              Diseño e impresión 3D en Villa María, Córdoba. Convertimos tus ideas en piezas únicas.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#71717a] hover:text-[#22d3ee] hover:bg-white/[0.08] transition-all duration-300" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#71717a] hover:text-[#22d3ee] hover:bg-white/[0.08] transition-all duration-300" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#52525b] mb-5">Navegación</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-[#fafafa] transition-colors duration-200">Inicio</Link></li>
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Productos</Link></li>
              <li><Link href="/ofertas" className="hover:text-[#fafafa] transition-colors duration-200">Ofertas</Link></li>
              <li><Link href="/novedades" className="hover:text-[#fafafa] transition-colors duration-200">Novedades</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-[#fafafa] transition-colors duration-200">Nosotros</Link></li>
              <li><Link href="/contacto" className="hover:text-[#fafafa] transition-colors duration-200">Contacto</Link></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#52525b] mb-5">Categorías</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Llaveros</Link></li>
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Mates y Bombillas</Link></li>
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Porta Sahumerios</Link></li>
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Dijes y Accesorios</Link></li>
              <li><Link href="/productos" className="hover:text-[#fafafa] transition-colors duration-200">Juguetes y Figuras</Link></li>
              <li><Link href="/productos" className="text-[#22d3ee] hover:text-[#67e8f9] transition-colors duration-200 font-medium">Ver todas</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#52525b] mb-5">Contacto</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#52525b]" />
                <span>25 de Mayo 187, Villa María, Córdoba</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#52525b]" />
                <span>+54 9 353 563-5221</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#52525b]" />
                <span>contacto@nhproducciones.com.ar</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-[#52525b]" />
                <span>Lun-Vie 9-18 hs · Sáb 9-13 hs</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#52525b] mb-3">Novedades</h3>
            <p className="text-xs text-[#71717a] mb-4">Suscribite y enterate antes que nadie.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-white/[0.04] border border-white/[0.06] text-[#fafafa] rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#22d3ee]/50 transition-colors placeholder:text-[#52525b]"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#22d3ee] p-1.5 hover:bg-white/[0.05] rounded-lg transition-all duration-200">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-[#52525b] gap-4">
          <p className="font-mono">&copy; {new Date().getFullYear()} NHproducciones · NH3D</p>
          <div className="flex items-center gap-4 font-mono tracking-wider">
            <span className="text-[#71717a]">VISA</span>
            <span className="text-[#71717a]">MC</span>
            <span className="text-[#71717a]">MERCADO PAGO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
