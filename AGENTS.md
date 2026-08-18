# sistema-catalogo

## Arquitectura

- Monorepo: `backend/` (NestJS 11 + Prisma 7) + `frontend/` (Next.js 16 + React 19)
- Cada carpeta tiene su propio `package.json` y `node_modules` (no hay workspace link)
- Base de datos: PostgreSQL (Supabase) con Prisma usando `@prisma/adapter-pg` (driver adapter)
- Imágenes: Cloudinary
- Auth: JWT (guard en backend), token guardado en localStorage (Zustand en frontend)

## Comandos

### Backend (`backend/`)

```bash
npm install
npx prisma generate
npm run start:dev    # puerto 3001
npm run lint
npm run format       # Prettier (singleQuote + trailingComma)
npm run test         # unit tests (Jest)
npm run test:e2e     # tests de integración
```

Después de cambiar `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name <nombre>
npx prisma generate
```

### Frontend (`frontend/`)

```bash
npm install
npm run dev          # puerto 3000
npm run lint
npm run build        # build de producción
```

## Datos clave

- Todas las rutas del backend van bajo el prefijo `/api` (configurado en `backend/src/main.ts`)
- El backend valida DTOs de forma estricta: `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- El cliente API del frontend apunta a `http://localhost:3001/api` por defecto (se puede cambiar con `NEXT_PUBLIC_API_URL`)
- El layout del admin (barra lateral verde oscuro) oculta automáticamente Navbar/Footer/CartDrawer cuando la URL empieza con `/admin`
- Muchas páginas del admin son placeholder (marcas, ofertas, novedades, usuarios, valoraciones, cupones, envíos, reportes)
- El schema de Prisma tiene 8 modelos pero solo 1 migración — el schema está adelantado del historial de migraciones
- `reactCompiler: true` en `next.config.ts`
- Next.js 16 tiene cambios rotos — revisar `frontend/node_modules/next/dist/docs/` antes de escribir código del frontend

## Cosas a tener cuidado

- El `.env` del backend tiene credenciales reales de la DB y secretos de Cloudinary — nunca commitear cambios al mismo
- El usuario admin se inicializa con `GET /api/auth/init` (no hay archivo de seed)
- En el backend, `@typescript-eslint/no-explicit-any` está desactivado; `no-floating-promises` es solo warning
- No hay CI, no hay Docker, no hay Makefile — el deploy es Vercel (solo frontend) vía el `vercel.json` de la raíz
- `frontend/AGENTS.md` y `frontend/CLAUDE.md` son auto-generados por Next.js — no editar a mano
