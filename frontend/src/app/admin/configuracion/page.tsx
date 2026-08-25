export default function ConfiguracionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configuración</h1>
        <p className="text-gray-500 mt-1 text-sm">Ajustá la configuración general de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Datos de la tienda</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nombre</label>
              <input defaultValue="NH3D · NHproducciones" className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-[#154971]" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">WhatsApp</label>
              <input defaultValue="+54 9 3535 635221" className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-[#154971]" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input defaultValue="contacto@nhproducciones.com.ar" className="w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:border-[#154971]" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferencias</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <label className="flex items-center justify-between gap-4">
              <span>Productos destacados visibles</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-[#154971]" />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Ofertas activas</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-[#154971]" />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Newsletter habilitado</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-[#154971]" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
