'use client';

import { useEffect } from 'react';
import { initTheme } from '../store/themeStore';

export default function ThemeInitializer() {
  useEffect(() => {
    initTheme();
  }, []);

  return null;
}
