'use client';

import { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const submit = (e?: any) => {
    if (e) e.preventDefault();
    setOpen(false);
    const encoded = encodeURIComponent(q || '');
    router.push(`/productos${encoded ? `?query=${encoded}` : ''}`);
  };

  return (
    <div className="relative">
      {!open && (
        <button onClick={() => setOpen(true)} className="p-2 hover:text-[#324b3b] transition-colors" aria-label="Abrir búsqueda">
          <SearchIcon className="h-5 w-5" />
        </button>
      )}

      {open && (
        <form onSubmit={submit} className="absolute right-0 top-0 bg-white p-2 rounded-lg shadow-md flex items-center gap-2 z-50 w-64">
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar productos..." className="w-full text-sm outline-none" />
          <button type="submit" className="p-2 text-[#324b3b]">Buscar</button>
          <button type="button" onClick={() => setOpen(false)} className="p-2 text-gray-400">
            <X className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
