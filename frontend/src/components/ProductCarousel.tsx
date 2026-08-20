'use client';

import { type ReactNode } from 'react';

interface ProductCarouselProps {
  children: ReactNode;
  speed?: 'normal' | 'slow';
}

export default function ProductCarousel({ children, speed = 'normal' }: ProductCarouselProps) {
  const animClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  return (
    <div className="relative overflow-hidden group">
      <div className={`${animClass} flex gap-4 md:gap-6 w-max`}>
        {children}
        {children}
      </div>
    </div>
  );
}
