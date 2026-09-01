import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import LayoutShell from '../components/LayoutShell';
import ThemeInitializer from '../components/ThemeInitializer';

export const metadata: Metadata = {
  title: 'NH3D | Diseño e Impresión 3D en Villa María',
  description: 'NHproducciones · NH3D. Diseño e impresión 3D en Villa María, Córdoba. Llaveros, mates, figuras, utilidades y piezas personalizadas. Envíos a todo el país.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${GeistSans.className} ${GeistMono.className} bg-[#fafafa] dark:bg-[#050505] text-[#0a0a0a] dark:text-[#fafafa] antialiased min-h-screen flex flex-col`}>
        <ThemeInitializer />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
