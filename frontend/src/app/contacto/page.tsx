export default function ContactoPage() {
  return (
    <div className="min-h-screen py-12 bg-[#f4f7fa] dark:bg-[#0f172a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-md">
          <img src="/portada.jpg" alt="Contacto NH3D" className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-[#132a45] dark:text-[#67e8f9] mb-4">Contacto</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-2">WhatsApp: <a href="https://wa.me/5493535635221" target="_blank" rel="noopener noreferrer" className="text-[#154971] dark:text-[#22d3ee]">+54 9 353 563-5221</a></p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Email: <a href="mailto:contacto@nhproducciones.com.ar" className="text-[#154971] dark:text-[#22d3ee]">contacto@nhproducciones.com.ar</a></p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Horario de atención: Lunes a Viernes de 9 a 18 hs · Sábados de 9 a 13 hs.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form className="space-y-3">
                <input className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2" placeholder="Nombre" />
                <input className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2" placeholder="Email" />
                <textarea className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-3 py-2" rows={4} placeholder="Contanos qué pieza querés imprimir..." />
                <button type="submit" className="bg-[#154971] dark:bg-[#22d3ee] text-white px-4 py-2 rounded">Enviar mensaje</button>
              </form>

              <div className="text-gray-600 dark:text-gray-400">
                <h3 className="font-semibold text-[#132a45] dark:text-[#67e8f9] mb-2">Visitanos</h3>
                <p>25 de Mayo 187, Villa María, Córdoba</p>
                <iframe
                  title="mapa"
                  className="w-full h-48 mt-3 border border-gray-300 dark:border-gray-600 rounded"
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
