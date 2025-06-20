# Guía de Despliegue en VPS - Landing Page Next.js

## 1. Configuración Inicial del VPS

### 1.1 Conectar al VPS
```bash
ssh root@tu-ip-del-vps
```

### 1.2 Actualizar el sistema
```bash
apt update && apt upgrade -y
```

### 1.3 Instalar dependencias básicas
```bash
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

## 2. Instalar Docker

### 2.1 Agregar repositorio oficial de Docker
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 2.2 Instalar Docker
```bash
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 2.3 Verificar instalación
```bash
docker --version
docker compose version
```

## 3. Instalar Nginx

### 3.1 Instalar Nginx
```bash
apt install -y nginx
```

### 3.2 Habilitar y iniciar Nginx
```bash
systemctl enable nginx
systemctl start nginx
```

## 4. Configurar Firewall

### 4.1 Instalar UFW si no está instalado
```bash
apt install -y ufw
```

### 4.2 Configurar reglas básicas
```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80
ufw allow 443
ufw enable
```

## 5. Configurar Dominio (Opcional)

### 5.1 Instalar Certbot para SSL
```bash
apt install -y certbot python3-certbot-nginx
```

## 6. Desplegar la Aplicación

### 6.1 Crear directorio para la aplicación
```bash
mkdir -p /var/www/sts-ai
cd /var/www/sts-ai
```

### 6.2 Clonar tu repositorio
```bash
git clone https://github.com/tu-usuario/sts-ai.git .
```

### 6.3 Construir y ejecutar con Docker
```bash
docker build -t sts-ai .
docker run -d --name sts-ai-app -p 3000:3000 sts-ai
```

## 7. Configurar Nginx como Proxy Reverso

### 7.1 Crear configuración de Nginx
```bash
nano /etc/nginx/sites-available/sts-ai
```

### 7.2 Contenido de la configuración:
```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

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
    }
}
```

### 7.3 Habilitar el sitio
```bash
ln -s /etc/nginx/sites-available/sts-ai /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

## 8. Configurar SSL (Opcional)

### 8.1 Obtener certificado SSL
```bash
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 9. Configurar Docker Compose (Recomendado)

### 9.1 Crear docker-compose.yml
```yaml
version: '3.8'
services:
  sts-ai:
    build: .
    container_name: sts-ai-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### 9.2 Ejecutar con Docker Compose
```bash
docker compose up -d
```

## 10. Monitoreo y Logs

### 10.1 Ver logs de la aplicación
```bash
docker logs sts-ai-app
```

### 10.2 Ver logs de Nginx
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 11. Actualizaciones

### 11.1 Script de actualización automática
```bash
#!/bin/bash
cd /var/www/sts-ai
git pull
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 12. Backup

### 12.1 Crear script de backup
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/sts-ai_$DATE.tar.gz /var/www/sts-ai
```

## Comandos Útiles

- **Reiniciar servicios**: `systemctl restart nginx`
- **Ver estado de Docker**: `docker ps`
- **Entrar al contenedor**: `docker exec -it sts-ai-app sh`
- **Ver uso de recursos**: `htop`
- **Ver espacio en disco**: `df -h`

## Notas Importantes

1. Reemplaza `tu-ip-del-vps` con la IP real de tu VPS
2. Reemplaza `tu-dominio.com` con tu dominio real
3. Reemplaza `tu-usuario` con tu usuario de GitHub
4. Asegúrate de que el puerto 3000 esté abierto en tu VPS
5. Configura backups regulares
6. Monitorea los logs regularmente 