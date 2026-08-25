import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutShell from '../components/LayoutShell';
import ThemeInitializer from '../components/ThemeInitializer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-gray-50 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 antialiased min-h-screen flex flex-col`}>
        <ThemeInitializer />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
