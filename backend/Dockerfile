# Stage 1: dependencias y compilación
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . .

# Generamos el cliente de Prisma y compilamos la app
RUN npx prisma generate
RUN npm run build

# Stage 2: producción (contenedor liviano)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]