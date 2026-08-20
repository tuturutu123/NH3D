/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Tags, LogOut, Settings, Leaf, Tag, Star, ShoppingBag, Users, MessageSquare, Ticket, Truck, BarChart2, Calendar, ShoppingCart } from 'lucide-react';
import { api } from '../../lib/api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (pathname === '/admin/login') return;

    api.get('/usuarios')
      .then(() => setAuthenticated(true))
      .catch(() => {
        setAuthenticated(false);
        router.push('/admin/login');
      });
  }, [pathname, router]);

  if (!mounted) return null;
  if (pathname === '/admin/login') return <>{children}</>;
  if (!authenticated) return null;

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; max-age=0';
    router.push('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: pathname === '/admin' },
    { icon: Package, label: 'Productos', href: '/admin/productos', active: pathname.includes('/admin/productos') || pathname === '/admin' },
    { icon: Tags, label: 'Categorías', href: '/admin/categorias', active: pathname.includes('/admin/categorias') },
    { icon: Tag, label: 'Marcas', href: '/admin/marcas', active: pathname.includes('/admin/marcas') },
    { icon: Star, label: 'Ofertas', href: '/admin/ofertas', active: pathname.includes('/admin/ofertas') },
    { icon: ShoppingBag, label: 'Novedades', href: '/admin/novedades', active: pathname.includes('/admin/novedades') },
    { icon: ShoppingCart, label: 'Pedidos', href: '/admin/pedidos', active: pathname.includes('/admin/pedidos') },
    { icon: Users, label: 'Clientes', href: '/admin/clientes', active: pathname.includes('/admin/clientes') },
    { icon: MessageSquare, label: 'Valoraciones', href: '/admin/valoraciones', active: pathname.includes('/admin/valoraciones') },
    { icon: Ticket, label: 'Cupones', href: '/admin/cupones', active: pathname.includes('/admin/cupones') },
    { icon: Truck, label: 'Envíos', href: '/admin/envios', active: pathname.includes('/admin/envios') },
    { icon: BarChart2, label: 'Reportes', href: '/admin/reportes', active: pathname.includes('/admin/reportes') },
    { icon: Calendar, label: 'Inventario', href: '/admin/inventario', active: pathname.includes('/admin/inventario') },
    { icon: Settings, label: 'Configuración', href: '/admin/configuracion', active: pathname.includes('/admin/configuracion') },
    { icon: Users, label: 'Usuarios', href: '/admin/usuarios', active: pathname.includes('/admin/usuarios') },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] dark:bg-[#0f172a] overflow-hidden font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-[#283d2d] dark:bg-[#0c1520] text-gray-300 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 pt-2">
          <Link href="/admin" className="flex items-center gap-3 text-white">
            <Leaf className="h-8 w-8 text-white" />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wide leading-none">NATURA</span>
              <span className="text-[9px] uppercase tracking-widest mt-1 text-gray-300">Tienda de Productos</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                  item.active
                    ? 'bg-[#3b5542] text-white shadow-sm'
                    : 'hover:bg-[#324a38] text-[#d4dbd6] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4.5 w-4.5 opacity-90" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Bottom */}
        <div className="p-4 m-3 mt-0 bg-[#324a38] rounded-xl flex flex-col gap-3">
           <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="bg-[#e3e8d8] p-1.5 rounded-full text-[#283d2d]"><Leaf className="h-5 w-5"/></div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-white leading-tight">Natura Tienda</span>
                  <span className="text-[11px] text-[#aebbae]">Administrador</span>
                </div>
              </div>
           </div>
           <button onClick={handleLogout} className="text-xs text-center text-[#d4dbd6] hover:text-white border border-[#4d6b55] rounded-lg py-1.5 transition-colors">
              Cerrar sesión
           </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
