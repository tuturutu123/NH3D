# sistema-catalogo

## Arquitectura

- Monorepo: `backend/` (NestJS 11 + Prisma 7) + `frontend/` (Next.js 16 + React 19)
- Cada carpeta tiene su propio `package.json` y `node_modules` (no hay workspace link)
- Base de datos: PostgreSQL (Supabase) con Prisma usando `@prisma/adapter-pg` (driver adapter) — requiere `npx prisma generate`; las migraciones usan `DIRECT_URL`
- Imágenes: Cloudinary
- Auth: login por email + password → OTP por email (Resend) → JWT en cookie **httpOnly** `access_token`. Guard global `JwtAuthGuard` + `ThrottlerGuard` en `backend/src/app.module.ts`; las rutas públicas se marcan con `@Public()`

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
- El cliente API del frontend apunta a `http://localhost:3001/api` por defecto (se puede cambiar con `NEXT_PUBLIC_API_URL`) y usa `withCredentials: true` (el JWT viaja en cookie, no en header)
- `LayoutShell` oculta Navbar/Footer/CartDrawer/ botón de carrito cuando la URL empieza con `/admin`
- El sidebar del admin es oscuro (`#050505`) con acentos cyan (`#0891b2`/`#22d3ee`) — los tokens visuales están en `DESIGN.md` de la raíz
- Casi todas las páginas del admin están implementadas: `novedades`/`ofertas` son vistas de `ProductFlagManager` (flags `destacado`/`oferta`) y `admin/productos` re-exporta el dashboard de `/admin`
- El schema de Prisma tiene 10 modelos y 3 migraciones (`init`, `sync_models`, `add_settings`) — el schema está al día con las migraciones

## Cosas a tener cuidado

- No existe `.env.example`. `backend/.env` tiene credenciales reales (DB, Cloudinary, Resend, JWT) — nunca commitearlo. Variables que hay que setear a mano: `DATABASE_URL`, `DIRECT_URL`, `CLOUDINARY_*`, `JWT_SECRET`, `INIT_SECRET`, `INIT_ADMIN_EMAIL`, `INIT_ADMIN_PASS`, `RESEND_API_KEY`, `RESEND_FROM`, `FRONTEND_URL` (CORS), `PORT`
- El admin se inicializa con `GET /api/auth/init?secret=INIT_SECRET` — solo en dev (403 en producción); crea/actualiza el usuario de `INIT_ADMIN_EMAIL`/`INIT_ADMIN_PASS` (no hay archivo de seed)
- Login de prueba requiere recibir el OTP por email (Resend) — no hay forma de saltarse el paso OTP
- El backend tiene un módulo `dev` con `POST /api/dev/assign-images` que solo funciona fuera de producción
- En el backend, `@typescript-eslint/no-explicit-any` está desactivado; `no-floating-promises` es solo warning
- No hay CI ni Makefile — el deploy es un único proyecto Vercel en modo **Services** (`vercel.json` de la raíz): servicio `frontend` (Next.js) sirve `/` y servicio `backend` (NestJS con entrypoint en `backend/src/main.ts`, build: `npx prisma generate && npm run build`) sirve bajo `/api/*` vía rewrites. En producción hay que setear `NEXT_PUBLIC_API_URL=https://<dominio>/api` para llamadas same-origin
- `frontend/AGENTS.md` y `frontend/CLAUDE.md` son auto-generados por Next.js — no editar a mano
- Next.js 16 tiene cambios rotos — revisar `frontend/node_modules/next/dist/docs/` antes de escribir código del frontend