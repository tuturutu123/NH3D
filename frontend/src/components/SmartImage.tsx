'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

export default function SmartImage({
  src,
  alt,
  className = '',
  fallback = '/categorias/default.svg',
  loading = 'lazy',
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [lastSrc, setLastSrc] = useState(src);

  if (src !== lastSrc) {
    setLastSrc(src);
    setCurrentSrc(src);
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}
