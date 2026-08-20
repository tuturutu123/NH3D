'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Lock, Mail } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Store className="h-10 w-10 text-green-600 dark:text-green-400" />
          <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            KIOSCO <span className="text-green-600 dark:text-green-400">24HS</span>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Panel de Administración
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1e293b] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-md text-sm font-medium">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 border py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="admin@kiosco24hs.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 border py-2 px-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Iniciando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
