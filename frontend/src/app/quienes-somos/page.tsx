export default function QuienesSomos() {
  return (
    <div className="min-h-screen py-12 bg-[#faf9f6] dark:bg-[#0f172a]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl overflow-hidden shadow-md">
          <img src="/portada.png" alt="Portada" className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-[#2a3c2e] dark:text-[#a8d5a2] mb-4">Quiénes somos</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Somos Natura, una tienda dedicada a productos para el mate, bebidas y alimentos. Nuestra misión es ofrecer productos de calidad y un servicio cercano.</p>
            <p className="text-gray-600 dark:text-gray-400">Trabajamos con productores locales y marcas confiables para garantizar frescura y buen precio. Vení a conocernos o hacé tu pedido online.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
