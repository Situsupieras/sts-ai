# sts-ai/Dockerfile
# VERSIÓN CORREGIDA - Problema de estilos resuelto
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar archivos de configuración primero
COPY package.json ./
COPY next.config.mjs ./
COPY tailwind.config.js ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# CRÍTICO: Eliminar el archivo conflictivo antes de build
RUN rm -f next.config.js

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
EXPOSE 3000

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos construidos
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
CMD ["node", "server.js"]
