export default function ContactoPage() {
  return (
    <div className="min-h-screen py-12 bg-[#fafafa] dark:bg-[#050505]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-md border border-black/[0.06] dark:border-white/[0.06]">
          <img src="/portada.jpg" alt="Contacto NH3D" className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-[#0a0a0a] dark:text-[#fafafa] mb-4 tracking-tight">Contacto</h1>
            <p className="text-[#71717a] dark:text-[#a1a1aa] mb-2">WhatsApp: <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">+54 9 353 563-5221</a></p>
            <p className="text-[#71717a] dark:text-[#a1a1aa] mb-2">Email: <a href="mailto:contacto@nhproducciones.com.ar" className="text-[#0891b2] dark:text-[#22d3ee] hover:underline">contacto@nhproducciones.com.ar</a></p>
            <p className="text-[#71717a] dark:text-[#a1a1aa] mb-4">Horario de atención: Lunes a Viernes de 9 a 18 hs · Sábados de 9 a 13 hs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form className="space-y-3">
                <input className="w-full border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]" placeholder="Nombre" />
                <input className="w-full border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]" placeholder="Email" />
                <textarea className="w-full border border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] transition-colors placeholder:text-[#a1a1aa]" rows={4} placeholder="Contanos qué pieza querés imprimir..." />
                <button type="submit" className="bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] px-6 py-2.5 rounded-xl font-semibold transition-all duration-300">Enviar mensaje</button>
              </form>

              <div className="text-[#71717a] dark:text-[#a1a1aa]">
                <h3 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-2">Visitanos</h3>
                <p>25 de Mayo 187, Villa María, Córdoba</p>
                <iframe
                  title="mapa"
                  className="w-full h-48 mt-3 border border-black/[0.06] dark:border-white/[0.06] rounded-xl"
                  src="https://www.google.com/maps?q=25%20de%20Mayo%20187,%20Villa%20Mar%C3%ADa,%20C%C3%B3rdoba,%20Argentina&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
