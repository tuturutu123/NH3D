import Link from 'next/link';
import { Box, PenTool, Truck, MapPin } from 'lucide-react';

export default function QuienesSomos() {
  return (
    <div className="min-h-screen py-12 bg-[#f4f7fa] dark:bg-[#0f172a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-md">
          <img src="/portada.jpg" alt="NH3D - NHproducciones" className="w-full h-64 object-cover" />
          <div className="p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-[#0369a1] dark:text-[#22d3ee] font-semibold mb-2">NHproducciones</p>
            <h1 className="text-3xl font-extrabold text-[#132a45] dark:text-[#67e8f9] mb-4">Quiénes somos</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Somos <strong>NH3D · NHproducciones</strong>, un emprendimiento de diseño e impresión 3D ubicado en
              Villa María, Córdoba. Nacimos con una idea simple: que cualquiera pueda tener el objeto que
              imagina, hecho a medida y a un precio accesible.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Nos especializamos en piezas personalizadas: llaveros, mates, porta sahumerios, dijes,
              soportes para notebook, juguetes, personajes, utilidades y todo lo que se pueda diseñar
              e imprimir en 3D. Si lo podés pensar, lo podemos imprimir.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div className="bg-[#f4f7fa] dark:bg-[#0f172a] border border-[#dbe4ec] dark:border-gray-700 rounded-2xl p-6">
                <Box className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
                <h2 className="font-bold text-lg text-[#132a45] dark:text-gray-100 mb-2">Servicio de Impresión 3D</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Traé tu modelo o elegí de nuestro catálogo. Trabajamos con materiales de calidad (PLA, PETG)
                  y terminaciones prolijas.
                </p>
              </div>
              <div className="bg-[#f4f7fa] dark:bg-[#0f172a] border border-[#dbe4ec] dark:border-gray-700 rounded-2xl p-6">
                <PenTool className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
                <h2 className="font-bold text-lg text-[#132a45] dark:text-gray-100 mb-2">Servicio de Diseño 3D</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ¿Tenés una idea pero no el archivo? La modelamos desde cero y la dejamos lista para imprimir.
                </p>
              </div>
              <div className="bg-[#f4f7fa] dark:bg-[#0f172a] border border-[#dbe4ec] dark:border-gray-700 rounded-2xl p-6">
                <Truck className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
                <h2 className="font-bold text-lg text-[#132a45] dark:text-gray-100 mb-2">Envíos a todo el país</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Despachamos tu pedido donde estés, con seguimiento y embalaje cuidado.
                </p>
              </div>
              <div className="bg-[#f4f7fa] dark:bg-[#0f172a] border border-[#dbe4ec] dark:border-gray-700 rounded-2xl p-6">
                <MapPin className="h-8 w-8 text-[#154971] dark:text-[#22d3ee] mb-3" />
                <h2 className="font-bold text-lg text-[#132a45] dark:text-gray-100 mb-2">Local en Villa María</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Encontranos en 25 de Mayo 187, Villa María, Córdoba. Pasá a ver las muestras o retirá tu pedido.
                </p>
              </div>
            </div>

            <Link href="/productos" className="inline-flex items-center gap-2 bg-[#154971] hover:bg-[#0f3556] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white font-bold py-3 px-8 rounded-full transition-colors">
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
