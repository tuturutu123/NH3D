'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Lock, Mail } from 'lucide-react';
import { api } from '../../../lib/api';
import { useAuthStore } from '../../../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      setAuth(response.data.user);
      router.push('/admin');
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#0891b2] dark:bg-[#22d3ee] flex items-center justify-center">
            <Box className="h-5 w-5 text-white dark:text-[#050505]" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-[#0a0a0a] dark:text-[#fafafa]">
            NH<span className="text-[#0891b2] dark:text-[#22d3ee]">3D</span>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa]">
          Panel de Administración
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#0a0a0a] py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-black/[0.06] dark:border-white/[0.06]">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-[#ef4444]/10 dark:bg-[#ef4444]/20 text-[#ef4444] p-3 rounded-xl text-sm font-medium border border-[#ef4444]/20">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa]">Correo electrónico</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#a1a1aa]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] sm:text-sm transition-colors"
                  placeholder="admin@nhproducciones.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52525b] dark:text-[#a1a1aa]">Contraseña</label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#a1a1aa]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-2.5 px-3 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] focus:outline-none focus:border-[#0891b2] dark:focus:border-[#22d3ee] sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0891b2] hover:bg-[#0e7490] dark:bg-[#22d3ee] dark:hover:bg-[#0891b2] dark:text-[#050505] focus:outline-none disabled:opacity-50 transition-colors"
            >
              {loading ? 'Iniciando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
