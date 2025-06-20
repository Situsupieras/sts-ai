#!/bin/bash

# Script de despliegue automatizado para STS-AI
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de STS-AI..."

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

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado. Por favor instala Docker primero."
fi

# Verificar si Docker Compose está disponible
if ! command -v docker compose &> /dev/null; then
    error "Docker Compose no está disponible. Por favor instala Docker Compose primero."
fi

# Crear directorio de logs si no existe
mkdir -p logs

# Parar contenedores existentes
log "Deteniendo contenedores existentes..."
docker compose down || true

# Limpiar imágenes antiguas (opcional)
log "Limpiando imágenes Docker antiguas..."
docker image prune -f || true

# Construir nueva imagen
log "Construyendo nueva imagen Docker..."
docker compose build --no-cache

# Iniciar servicios
log "Iniciando servicios..."
docker compose up -d

# Esperar a que el servicio esté listo
log "Esperando a que el servicio esté listo..."
sleep 10

# Verificar que el contenedor esté ejecutándose
if docker compose ps | grep -q "Up"; then
    log "✅ Despliegue completado exitosamente!"
    log "🌐 La aplicación está disponible en: http://localhost:3000"
    
    # Mostrar logs recientes
    log "📋 Logs recientes:"
    docker compose logs --tail=20
else
    error "❌ El despliegue falló. Revisa los logs con: docker compose logs"
fi

# Mostrar información del sistema
log "📊 Información del sistema:"
echo "Contenedores ejecutándose:"
docker compose ps
echo ""
echo "Uso de recursos:"
docker stats --no-stream || true 