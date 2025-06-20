#!/bin/bash

# Script de configuración simple para Alibaba Cloud Linux
# Sin Docker - Instalación directa de Node.js y Nginx
# Uso: ./vps-setup-simple.sh

set -e

echo "🔧 Configurando VPS Alibaba Cloud para STS-AI (Sin Docker)..."

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

# 1. Actualizar sistema
log "Actualizando sistema..."
yum update -y

# 2. Instalar dependencias básicas
log "Instalando dependencias básicas..."
yum install -y curl wget git unzip

# 3. Instalar Node.js 18
log "Instalando Node.js 18..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Verificar instalación de Node.js
if command -v node &> /dev/null; then
    log "✅ Node.js instalado correctamente"
    node --version
    npm --version
else
    error "❌ Error al instalar Node.js"
fi

# 4. Instalar Nginx
log "Instalando Nginx..."
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# 5. Configurar firewall
log "Configurando firewall..."
systemctl enable firewalld
systemctl start firewalld
firewall-cmd --permanent --add-service=ssh
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload

# 6. Instalar PM2 para gestión de procesos
log "Instalando PM2..."
npm install -g pm2

# 7. Crear directorio para la aplicación
log "Creando directorio para la aplicación..."
mkdir -p /var/www/sts-ai
cd /var/www/sts-ai

# 8. Configurar Nginx
log "Configurando Nginx..."
cat > /etc/nginx/conf.d/sts-ai.conf << 'EOF'
server {
    listen 80;
    server_name _;

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

# Remover configuración por defecto
rm -f /etc/nginx/conf.d/default.conf

# Verificar configuración de Nginx
if nginx -t; then
    systemctl reload nginx
    log "✅ Nginx configurado correctamente"
else
    error "❌ Error en la configuración de Nginx"
fi

# 9. Crear usuario para la aplicación
log "Creando usuario para la aplicación..."
useradd -r -s /bin/false sts-ai || true
chown -R sts-ai:sts-ai /var/www/sts-ai

# 10. Configurar logs
log "Configurando logs..."
mkdir -p /var/log/sts-ai
touch /var/log/sts-ai/app.log
chown -R sts-ai:sts-ai /var/log/sts-ai

# 11. Crear script de monitoreo
log "Creando script de monitoreo..."
cat > /usr/local/bin/monitor-sts-ai.sh << 'EOF'
#!/bin/bash
# Script de monitoreo para STS-AI

echo "=== Estado de STS-AI $(date) ==="
echo "PM2 processes:"
pm2 list
echo ""
echo "Nginx status:"
systemctl is-active nginx
echo ""
echo "Disk usage:"
df -h /var/www
echo ""
echo "Memory usage:"
free -h
echo ""
echo "Recent logs:"
tail -n 10 /var/log/sts-ai/app.log 2>/dev/null || echo "No logs found"
echo ""
echo "Nginx logs:"
tail -n 5 /var/log/nginx/sts-ai-access.log 2>/dev/null || echo "No nginx logs found"
EOF

chmod +x /usr/local/bin/monitor-sts-ai.sh

# 12. Configurar logrotate
log "Configurando logrotate..."
cat > /etc/logrotate.d/sts-ai << 'EOF'
/var/log/sts-ai/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 sts-ai sts-ai
    postrotate
        systemctl reload nginx
    endscript
}
EOF

# 13. Instalar Certbot para SSL (opcional)
log "Instalando Certbot..."
yum install -y certbot python3-certbot-nginx

# 14. Mostrar información final
log "✅ Configuración del VPS completada!"
echo ""
info "📋 Próximos pasos:"
echo "1. Clona tu repositorio: git clone https://github.com/tu-usuario/sts-ai.git /var/www/sts-ai"
echo "2. Configura tu dominio en /etc/nginx/conf.d/sts-ai.conf"
echo "3. Ejecuta: cd /var/www/sts-ai && ./deploy-simple.sh"
echo "4. Para SSL: certbot --nginx -d tu-dominio.com"
echo ""
info "🔧 Comandos útiles:"
echo "- Monitoreo: /usr/local/bin/monitor-sts-ai.sh"
echo "- Logs: tail -f /var/log/sts-ai/app.log"
echo "- Reiniciar: systemctl restart nginx"
echo "- Estado PM2: pm2 list"
echo ""
info "🌐 La aplicación estará disponible en:"
echo "- HTTP: http://172.19.182.80"
echo "- HTTPS: https://tu-dominio.com (después de configurar SSL)"
