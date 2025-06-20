#!/bin/bash

# Script de despliegue simple para STS-AI (Sin Docker)
# Uso: ./deploy-simple.sh

set -e

echo "🚀 Iniciando despliegue simple de STS-AI..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    error "Node.js no está instalado. Por favor instala Node.js primero."
fi

# Verificar si PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    error "PM2 no está instalado. Por favor instala PM2 primero: npm install -g pm2"
fi

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Asegúrate de estar en el directorio del proyecto."
fi

# Crear directorio de logs si no existe
mkdir -p logs

# Parar aplicación existente si está ejecutándose
log "Deteniendo aplicación existente..."
pm2 stop sts-ai 2>/dev/null || true
pm2 delete sts-ai 2>/dev/null || true

# Limpiar instalación anterior
log "Limpiando instalación anterior..."
rm -rf node_modules
rm -rf .next

# Instalar dependencias
log "Instalando dependencias..."
npm install

# Construir la aplicación
log "Construyendo la aplicación..."
npm run build

# Iniciar con PM2 en modo standalone
log "Iniciando aplicación con PM2 en modo standalone..."
pm2 start "node .next/standalone/server.js" --name "sts-ai" --env HOST=0.0.0.0
pm2 save

# Esperar a que el servicio esté listo
log "Esperando a que el servicio esté listo..."
sleep 5

# Verificar que la aplicación esté ejecutándose
if pm2 list | grep -q "sts-ai.*online"; then
    log "✅ Despliegue completado exitosamente!"
    log "🌐 La aplicación está disponible en: https://stselpoderdelaia.online"
    
    # Mostrar información de PM2
    log "📋 Estado de PM2:"
    pm2 list
    pm2 logs sts-ai --lines 10
else
    error "❌ El despliegue falló. Revisa los logs con: pm2 logs sts-ai"
fi

# Mostrar información del sistema
log "📊 Información del sistema:"
echo "Procesos PM2:"
pm2 list
echo ""
echo "Uso de memoria:"
free -h
echo ""
echo "Uso de disco:"
df -h /var/www/sts-ai 