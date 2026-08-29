/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { api } from '../../../lib/api';
import { Save, Loader2, Store, Settings2 } from 'lucide-react';

interface SettingsData {
  storeName: string;
  whatsapp: string;
  email: string;
  destacadosVisible: boolean;
  ofertasActivas: boolean;
  newsletterHabilitado: boolean;
}

export default function ConfiguracionPage() {
  const [form, setForm] = useState<SettingsData>({
    storeName: '',
    whatsapp: '',
    email: '',
    destacadosVisible: true,
    ofertasActivas: true,
    newsletterHabilitado: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      const res = await api.get('/settings');
      const d = res.data;
      setForm({
        storeName: d.storeName ?? '',
        whatsapp: d.whatsapp ?? '',
        email: d.email ?? '',
        destacadosVisible: d.destacadosVisible !== 'false',
        ofertasActivas: d.ofertasActivas !== 'false',
        newsletterHabilitado: d.newsletterHabilitado !== 'false',
      });
    } catch (err) {
      console.error('Error al cargar configuración', err);
      setError('No se pudo cargar la configuración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await api.patch('/settings', {
        data: {
          storeName: form.storeName,
          whatsapp: form.whatsapp,
          email: form.email,
          destacadosVisible: String(form.destacadosVisible),
          ofertasActivas: String(form.ofertasActivas),
          newsletterHabilitado: String(form.newsletterHabilitado),
        },
      });
      setMessage('Configuración guardada correctamente.');
    } catch (err) {
      console.error('Error al guardar configuración', err);
      setError('No se pudo guardar la configuración.');
    } finally {
      setSaving(false);
    }
  };

  const set = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (loading) {
    return <div className="p-8 flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-[#0891b2]"></div></div>;
  }

  const inputCls =
    'w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] px-3 py-2 focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] text-[#0a0a0a] dark:text-[#fafafa] bg-[#fafafa] dark:bg-white/[0.03] transition-colors';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">Configuración</h1>
        <p className="text-[#71717a] dark:text-[#52525b] mt-1 text-sm">Ajustá la configuración general de tu tienda.</p>
      </div>

      {(message || error) && (
        <div className={`mb-6 p-3 rounded-xl text-sm font-medium border ${
          error
            ? 'bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/20'
            : 'bg-[#22c55e]/10 dark:bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/20'
        }`}>
          {error || message}
        </div>
      )}

      <form onSubmit={handleGuardar}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 flex items-center gap-2">
              <Store className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee]" /> Datos de la tienda
            </h2>
            <div className="space-y-4 text-sm text-[#71717a] dark:text-[#a1a1aa]">
              <div>
                <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">Nombre</label>
                <input value={form.storeName} onChange={(e) => set('storeName', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">WhatsApp</label>
                <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-[#52525b] dark:text-[#a1a1aa] font-medium mb-1">Email</label>
                <input value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-[#0891b2] dark:text-[#22d3ee]" /> Preferencias
            </h2>
            <div className="space-y-4 text-sm text-[#71717a] dark:text-[#a1a1aa]">
              <label className="flex items-center justify-between gap-4">
                <span>Productos destacados visibles</span>
                <input type="checkbox" checked={form.destacadosVisible} onChange={(e) => set('destacadosVisible', e.target.checked)} className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Ofertas activas</span>
                <input type="checkbox" checked={form.ofertasActivas} onChange={(e) => set('ofertasActivas', e.target.checked)} className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span>Newsletter habilitado</span>
                <input type="checkbox" checked={form.newsletterHabilitado} onChange={(e) => set('newsletterHabilitado', e.target.checked)} className="h-4 w-4 accent-[#0891b2] dark:accent-[#22d3ee] rounded" />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] text-white dark:text-[#050505] py-2.5 px-6 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
