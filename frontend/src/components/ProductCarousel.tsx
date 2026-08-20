'use client';

import { type ReactNode } from 'react';

interface ProductCarouselProps {
  children: ReactNode;
  speed?: 'normal' | 'slow';
}

export default function ProductCarousel({ children, speed = 'normal' }: ProductCarouselProps) {
  const duration = speed === 'slow' ? '50s' : '35s';

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex gap-4 md:gap-6"
        style={{
          width: 'max-content',
          animation: `marquee ${duration} linear infinite`,
        }}
      >
        <div className="flex gap-4 md:gap-6 shrink-0">
          {children}
        </div>
        <div className="flex gap-4 md:gap-6 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
