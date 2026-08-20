'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  fallbackSrc?: string;
}

const BLUR_LIGHT = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmNmYmY5Ii8+PC9zdmc+';
export default function OptimizedImage({ fallbackSrc = '/categorias/default.svg', alt, ...props }: OptimizedImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || ''}
        className={props.className}
        width={typeof props.width === 'number' ? props.width : undefined}
        height={typeof props.height === 'number' ? props.height : undefined}
      />
    );
  }

  return (
    <Image
      alt={alt || ''}
      placeholder="blur"
      blurDataURL={BLUR_LIGHT}
      onError={() => setErrored(true)}
      sizes={props.sizes || '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw'}
      {...props}
    />
  );
}
