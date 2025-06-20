#!/bin/bash

# Script para configurar el dominio stselpoderdelaia.online
# Uso: ./setup-domain.sh

set -e

echo "🌐 Configurando dominio stselpoderdelaia.online..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Verificar si se ejecuta como root
if [[ $EUID -ne 0 ]]; then
   error "Este script debe ejecutarse como root"
fi

# 1. Verificar que Nginx esté instalado
if ! command -v nginx &> /dev/null; then
    error "Nginx no está instalado. Ejecuta primero vps-setup-simple.sh"
fi

# 2. Verificar que Certbot esté instalado
if ! command -v certbot &> /dev/null; then
    log "Instalando Certbot..."
    yum install -y certbot python3-certbot-nginx
fi

# 3. Crear configuración de Nginx para el dominio
log "Configurando Nginx para stselpoderdelaia.online..."

cat > /etc/nginx/conf.d/sts-ai.conf << 'EOF'
server {
    listen 80;
    server_name stselpoderdelaia.online www.stselpoderdelaia.online;

    # Logs
    access_log /var/log/nginx/sts-ai-access.log;
    error_log /var/log/nginx/sts-ai-error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Health check endpoint
    location /health {
        proxy_pass http://localhost:3000/health;
        access_log off;
    }
}
EOF

# 4. Verificar configuración de Nginx
log "Verificando configuración de Nginx..."
if nginx -t; then
    systemctl reload nginx
    log "✅ Nginx configurado correctamente"
else
    error "❌ Error en la configuración de Nginx"
fi

# 5. Verificar que el dominio resuelva correctamente
log "Verificando resolución DNS..."
if nslookup stselpoderdelaia.online | grep -q "172.19.182.80"; then
    log "✅ DNS configurado correctamente"
else
    warn "⚠️  El dominio no resuelve a la IP correcta. Verifica la configuración DNS."
    info "El dominio debe apuntar a: 172.19.182.80"
fi

# 6. Obtener certificado SSL
log "Obteniendo certificado SSL..."
if certbot --nginx -d stselpoderdelaia.online -d www.stselpoderdelaia.online --non-interactive --agree-tos --email admin@stselpoderdelaia.online; then
    log "✅ Certificado SSL obtenido correctamente"
else
    warn "⚠️  No se pudo obtener el certificado SSL. Verifica que:"
    warn "   - El dominio esté configurado correctamente en DNS"
    warn "   - El puerto 80 esté abierto"
    warn "   - El dominio no esté en uso por otro servicio"
fi

# 7. Configurar renovación automática de SSL
log "Configurando renovación automática de SSL..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# 8. Verificar estado final
log "Verificando estado final..."
echo ""
info "📋 Estado de servicios:"
systemctl is-active nginx
systemctl is-active firewalld

echo ""
info "🌐 URLs de acceso:"
echo "- HTTP:  http://stselpoderdelaia.online"
echo "- HTTPS: https://stselpoderdelaia.online"
echo "- www:   https://www.stselpoderdelaia.online"

echo ""
info "🔧 Comandos útiles:"
echo "- Ver logs: tail -f /var/log/nginx/sts-ai-access.log"
echo "- Verificar SSL: openssl s_client -connect stselpoderdelaia.online:443"
echo "- Renovar SSL: certbot renew"
echo "- Estado Nginx: systemctl status nginx"

log "✅ Configuración del dominio completada!" 