import Link from 'next/link';
import { Box, PenTool, Truck, MapPin } from 'lucide-react';

export default function QuienesSomos() {
  return (
    <div className="min-h-screen py-12 bg-[#fafafa] dark:bg-[#050505]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-md border border-black/[0.06] dark:border-white/[0.06]">
          <img src="/portada.jpg" alt="NH3D - NHproducciones" className="w-full h-64 object-cover" />
          <div className="p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-[#0891b2] dark:text-[#22d3ee] font-semibold mb-2">NHproducciones</p>
            <h1 className="text-3xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] mb-4">Quiénes somos</h1>
            <p className="text-[#52525b] dark:text-[#a1a1aa] mb-4">
              Somos <strong>NH3D · NHproducciones</strong>, un emprendimiento de diseño e impresión 3D ubicado en
              Villa María, Córdoba. Nacimos con una idea simple: que cualquiera pueda tener el objeto que
              imagina, hecho a medida y a un precio accesible.
            </p>
            <p className="text-[#52525b] dark:text-[#a1a1aa] mb-8">
              Nos especializamos en piezas personalizadas: llaveros, mates, porta sahumerios, dijes,
              soportes para notebook, juguetes, personajes, utilidades y todo lo que se pueda diseñar
              e imprimir en 3D. Si lo podés pensar, lo podemos imprimir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                { icon: Box, title: 'Servicio de Impresión 3D', desc: 'Traé tu modelo o elegí de nuestro catálogo. Trabajamos con materiales de calidad (PLA, PETG) y terminaciones prolijas.' },
                { icon: PenTool, title: 'Servicio de Diseño 3D', desc: '¿Tenés una idea pero no el archivo? La modelamos desde cero y la dejamos lista para imprimir.' },
                { icon: Truck, title: 'Envíos a todo el país', desc: 'Despachamos tu pedido donde estés, con seguimiento y embalaje cuidado.' },
                { icon: MapPin, title: 'Local en Villa María', desc: 'Encontranos en 25 de Mayo 187, Villa María, Córdoba. Pasá a ver las muestras o retirá tu pedido.' },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 hover:border-[#0891b2]/20 dark:hover:border-[#22d3ee]/20 transition-all duration-300">
                  <item.icon className="h-8 w-8 text-[#0891b2] dark:text-[#22d3ee] mb-3" />
                  <h2 className="font-bold text-lg text-[#0a0a0a] dark:text-[#fafafa] mb-2">{item.title}</h2>
                  <p className="text-sm text-[#71717a] dark:text-[#a1a1aa]">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/productos" className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] font-bold py-3 px-8 rounded-xl transition-all duration-300">
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
