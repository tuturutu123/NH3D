'use client';

import { type ReactNode } from 'react';

interface ProductCarouselProps {
  children: ReactNode;
  speed?: 'normal' | 'slow';
}

export default function ProductCarousel({ children, speed = 'normal' }: ProductCarouselProps) {
  const animClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  return (
    <div className="relative overflow-hidden group/carousel">
      <div className={`${animClass} flex gap-4 md:gap-6 w-max`}>
        {children}
        {children}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-20 bg-linear-to-r from-[#fafafa] dark:from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-20 bg-linear-to-l from-[#fafafa] dark:from-[#050505] to-transparent z-10" />
    </div>
  );
}
