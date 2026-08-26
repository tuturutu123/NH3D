'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
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

  const submit = (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setOpen(false);
    const encoded = encodeURIComponent(q || '');
    router.push(`/productos${encoded ? `?query=${encoded}` : ''}`);
  };

  return (
    <div className="relative">
      {!open && (
        <button onClick={() => setOpen(true)} className="p-2 hover:text-[#0891b2] dark:hover:text-[#22d3ee] transition-colors" aria-label="Abrir búsqueda">
          <SearchIcon className="h-5 w-5" />
        </button>
      )}

      {open && (
        <form onSubmit={submit} className="absolute right-0 top-0 bg-white dark:bg-[#0a0a0a] p-2 rounded-xl shadow-md flex items-center gap-2 z-50 w-64 border border-black/[0.06] dark:border-white/[0.06]">
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar productos..." className="w-full text-sm outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400" />
          <button type="submit" className="p-2 text-[#0891b2] dark:text-[#22d3ee]">Buscar</button>
          <button type="button" onClick={() => setOpen(false)} className="p-2 text-gray-400">
            <X className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
