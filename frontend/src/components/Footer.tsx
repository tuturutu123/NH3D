import Link from 'next/link';
import { Phone, MapPin, Mail, Box, Clock, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0e2233] dark:bg-[#0c1520] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">

          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Box className="h-8 w-8 text-[#a5dcf0]" />
              <div className="flex flex-col text-[#a5dcf0]">
                <span className="text-xl font-bold tracking-tight leading-none">NH3D</span>
                <span className="text-[9px] uppercase tracking-[0.2em] mt-0.5">NHproducciones · Impresión 3D</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Diseño e impresión 3D en Villa María, Córdoba. Convertimos tus ideas en piezas únicas.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider">NAVEGACIÓN</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Productos</Link></li>
              <li><Link href="/ofertas" className="hover:text-white transition-colors">Ofertas</Link></li>
              <li><Link href="/novedades" className="hover:text-white transition-colors">Novedades</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-white transition-colors">Quiénes somos</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider">CATEGORÍAS</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/productos" className="hover:text-white transition-colors">Llaveros</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Mates y Bombillas</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Porta Sahumerios</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Dijes y Accesorios</Link></li>
              <li><Link href="/productos" className="hover:text-white transition-colors">Juguetes y Figuras</Link></li>
              <li><Link href="/productos" className="text-white hover:underline transition-colors">Ver todas</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wider">CONTACTO</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>25 de Mayo 187, Villa María, Córdoba</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>+54 9 353 563-5221</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>contacto@nhproducciones.com.ar</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Lunes a Viernes de 9 a 18 hs · Sábados de 9 a 13 hs</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-semibold text-sm mb-2 tracking-wider">RECIBÍ NOVEDADES Y OFERTAS</h3>
            <p className="text-xs text-gray-400 mb-4">Suscribite y enterate antes que nadie.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none"
              />
              <button className="absolute right-1 top-1 bottom-1 text-[#0e2233] dark:text-[#22d3ee] p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-600/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} NHproducciones · NH3D. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="font-bold text-white tracking-widest italic">VISA</span>
            <span className="font-bold text-orange-500 tracking-widest italic">mastercard</span>
            <span className="font-bold text-blue-400 tracking-widest italic">mercado pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
