export default function ConfiguracionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Configuración</h1>
        <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Ajustá la configuración general de tu tienda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4">Datos de la tienda</h2>
          <div className="space-y-4 text-sm text-[#71717a] dark:text-[#a1a1aa]">
            <div>
              <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">Nombre</label>
              <input defaultValue="NH3D · NHproducciones" className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] px-3 py-2 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-[#0a0a0a] dark:text-[#fafafa] bg-[#fafafa] dark:bg-white/[0.03] transition-colors" />
            </div>
            <div>
              <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">WhatsApp</label>
              <input defaultValue="+54 9 3535 635221" className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] px-3 py-2 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-[#0a0a0a] dark:text-[#fafafa] bg-[#fafafa] dark:bg-white/[0.03] transition-colors" />
            </div>
            <div>
              <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">Email</label>
              <input defaultValue="contacto@nhproducciones.com.ar" className="w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] px-3 py-2 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-[#0a0a0a] dark:text-[#fafafa] bg-[#fafafa] dark:bg-white/[0.03] transition-colors" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4">Preferencias</h2>
          <div className="space-y-4 text-sm text-[#71717a] dark:text-[#a1a1aa]">
            <label className="flex items-center justify-between gap-4">
              <span>Productos destacados visibles</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Ofertas activas</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span>Newsletter habilitado</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
