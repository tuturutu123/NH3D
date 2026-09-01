# sistema-catalogo

## Arquitectura

- Monorepo: `backend/` (NestJS 11 + Prisma 7) + `frontend/` (Next.js 16 + React 19)
- Cada carpeta tiene su propio `package.json` y `node_modules` (no hay workspace link)
- Base de datos: PostgreSQL (Supabase) con Prisma usando `@prisma/adapter-pg` (driver adapter) — requiere `npx prisma generate`. En runtime el cliente usa `DATABASE_URL` (`backend/src/prisma/prisma.service.ts`); el CLI de Prisma usa `DIRECT_URL` (`backend/prisma.config.ts`, el schema no define `url`)
- El frontend usa el directorio `src/app` (no hay `app/` en la raíz); path alias `@/*` → `./src/*`
- Imágenes: Cloudinary (solo en upload del módulo productos); scripts de seed/assign-images escriben rutas locales `/categorias/*.png`
- Auth: login por email + password → OTP por email (Resend) → JWT en cookie **httpOnly** `access_token`. Guard global `JwtAuthGuard` + `ThrottlerGuard` en `backend/src/app.module.ts`; las rutas públicas se marcan con `@Public()`
- Rate limit global: `ThrottlerGuard` con `ttl: 60000, limit: 10` (10 req/min por IP) — probar rutas a mano puede dar HTTP 429; no es error de la app

## Comandos

### Backend (`backend/`)

```bash
npm install
npx prisma generate              # required after install or schema changes
npm run start:dev                # puerto 3001
npm run lint                     # eslint con --fix
npm run format                   # Prettier
npm run test                     # unit tests (solo app.controller.spec.ts)
npm run test:e2e                 # integration tests
```

Después de cambiar `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name <nombre>
npx prisma generate
```

### Frontend (`frontend/`)

```bash
npm install
npm run dev                      # puerto 3000
npm run lint                     # eslint
npm run build                    # production build (no tiene tests)
```

## Datos clave

- Todas las rutas del backend van bajo `/api` (global prefix en `backend/src/main.ts`)
- Backend valida DTOs estrictamente: `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- Cliente API del frontend: `http://localhost:3001/api` por defecto (configurable con `NEXT_PUBLIC_API_URL`); usa `withCredentials: true` (JWT en cookie)
- `LayoutShell` oculta Navbar/Footer/CartDrawer/botón de carrito cuando la URL empieza con `/admin`
- Sidebar admin: fondo `#050505`, acentos cyan `#0891b2`/`#22d3ee` — tokens visuales en `DESIGN.md` de la raíz
- Admin pages: `novedades`/`ofertas` son vistas de `ProductFlagManager` (flags `destacado`/`oferta`); `admin/productos` re-exporta el dashboard de `/admin`
- Prisma schema: 10 modelos, 3 migraciones (`init`, `sync_models`, `add_settings`); schema al día
- `backend/scripts/`: utilidades SQL directas (sin Prisma) — `node scripts/<archivo>.mjs` desde `backend/`
  - `reseed-catalogo.mjs` es **destructivo** (borra valoraciones, pedidos, envíos, marcas y catálogo)
  - `inspect-db.mjs` explora la DB
- Backend: `@typescript-eslint/no-explicit-any` desactivado; `no-floating-promises` solo warning
- Backend tsconfig: usa `nodenext` module resolution, `ES2023` target, `noImplicitAny: false`
- Frontend: Tailwind v4 con PostCSS plugin `@tailwindcss/postcss` (no usa config legacy de Tailwind)

## Deploy

- Vercel en modo **Services** (`vercel.json` raíz): servicio `frontend` (Next.js) en `/`, servicio `backend` (NestJS, entrypoint `backend/src/main.ts`, build: `npx prisma generate && npm run build`) en `/api/*` vía rewrites
- En producción setear `NEXT_PUBLIC_API_URL=https://<dominio>/api` para llamadas same-origin
- No hay CI ni Makefile

## Cosas a tener cuidado

- `backend/.env.example` commiteado pero omite `FRONTEND_URL` (CORS) y `PORT` (defaults en código). `backend/.env` tiene credenciales reales — **nunca commitearlo**. Variables manuales: `DATABASE_URL`, `DIRECT_URL`, `CLOUDINARY_*`, `JWT_SECRET`, `INIT_SECRET`, `INIT_ADMIN_EMAIL`, `INIT_ADMIN_PASS`, `RESEND_API_KEY`, `RESEND_FROM`
- Admin se inicializa con `GET /api/auth/init?secret=INIT_SECRET` (solo dev; 403 en producción). No hay seed de Prisma; catálogo se carga con `node scripts/reseed-catalogo.mjs`
- Login de prueba requiere recibir OTP por email (Resend) — no hay forma de saltarse el paso OTP
- Backend módulo `dev`: `POST /api/dev/assign-images` solo funciona fuera de producción
- Next.js 16 build usa React Compiler (`reactCompiler: true` en `next.config.ts`) — algunos patrones de estado en efectos fallan (ver `eslint-disable` en `frontend/src/app/admin/page.tsx`)
- Next.js 16 tiene cambios rotos — revisar `frontend/node_modules/next/dist/docs/` antes de escribir código del frontend
- `frontend/AGENTS.md` y `frontend/CLAUDE.md` son auto-generados por Next.js — no editar a mano
- Frontend no tiene `.env.example`; `NEXT_PUBLIC_API_URL` es la única variable de entorno relevante
