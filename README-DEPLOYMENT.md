# 🚀 Guía de Despliegue en VPS - STS-AI

Esta guía te ayudará a configurar tu VPS desde cero para ejecutar tu landing page Next.js.

## 📋 Requisitos Previos

- Un VPS con Ubuntu 20.04+ o Debian 11+
- Acceso SSH al VPS
- Un dominio (opcional, pero recomendado)
- Git configurado en tu máquina local

## 🛠️ Configuración Rápida

### Opción 1: Script Automatizado (Recomendado)

1. **Conecta a tu VPS:**
   ```bash
   ssh root@tu-ip-del-vps
   ```

2. **Descarga y ejecuta el script de configuración:**
   ```bash
   wget https://raw.githubusercontent.com/tu-usuario/sts-ai/main/vps-setup.sh
   chmod +x vps-setup.sh
   ./vps-setup.sh
   ```

3. **Clona tu repositorio:**
   ```bash
   cd /var/www
   git clone https://github.com/tu-usuario/sts-ai.git sts-ai
   cd sts-ai
   ```

4. **Configura tu dominio:**
   ```bash
   nano nginx.conf
   # Cambia "tu-dominio.com" por tu dominio real
   ```

5. **Despliega la aplicación:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Opción 2: Configuración Manual

Sigue la guía completa en `deployment-guide.md`

## 🔧 Archivos de Configuración

### `docker-compose.yml`
Configuración de Docker Compose para la aplicación:
- Puerto: 3000
- Restart automático
- Volúmenes para logs
- Red dedicada

### `nginx.conf`
Configuración de Nginx como proxy reverso:
- Compresión Gzip
- Headers de seguridad
- Cache para assets estáticos
- Health check endpoint

### `deploy.sh`
Script de despliegue automatizado:
- Verificación de dependencias
- Build de Docker
- Verificación de estado
- Logs de despliegue

### `vps-setup.sh`
Script de configuración inicial del VPS:
- Instalación de Docker
- Configuración de Nginx
- Configuración de firewall
- Instalación de Certbot

## 🌐 Configuración de Dominio

### 1. Configurar DNS
Apunta tu dominio al VPS:
```
A    tu-dominio.com    -> IP-DEL-VPS
A    www.tu-dominio.com -> IP-DEL-VPS
```

### 2. Actualizar configuración de Nginx
```bash
nano /etc/nginx/sites-available/sts-ai
# Cambia "tu-dominio.com" por tu dominio real
systemctl reload nginx
```

### 3. Configurar SSL (Opcional)
```bash
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

## 📊 Monitoreo

### Comandos Útiles
```bash
# Estado de la aplicación
docker compose ps

# Logs de la aplicación
docker logs sts-ai-app

# Logs de Nginx
tail -f /var/log/nginx/sts-ai-access.log

# Monitoreo completo
/usr/local/bin/monitor-sts-ai.sh

# Uso de recursos
htop
df -h
```

### Script de Monitoreo
El script `monitor-sts-ai.sh` te proporciona:
- Estado de contenedores Docker
- Estado de Nginx
- Uso de disco y memoria
- Logs recientes

## 🔄 Actualizaciones

### Actualización Manual
```bash
cd /var/www/sts-ai
git pull
./deploy.sh
```

### Actualización Automática (Cron)
```bash
# Editar crontab
crontab -e

# Agregar línea para actualización diaria
0 2 * * * cd /var/www/sts-ai && git pull && ./deploy.sh >> /var/log/sts-ai/update.log 2>&1
```

## 🛡️ Seguridad

### Firewall Configurado
- SSH (puerto 22)
- HTTP (puerto 80)
- HTTPS (puerto 443)
- Resto de puertos bloqueados

### Headers de Seguridad
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### Usuario No-Root
La aplicación se ejecuta con usuario `sts-ai` sin privilegios de root.

## 📝 Logs

### Ubicaciones de Logs
- **Aplicación:** `/var/log/sts-ai/app.log`
- **Nginx Access:** `/var/log/nginx/sts-ai-access.log`
- **Nginx Error:** `/var/log/nginx/sts-ai-error.log`
- **Docker:** `docker logs sts-ai-app`

### Rotación de Logs
Los logs se rotan automáticamente:
- Diariamente
- Máximo 7 archivos
- Compresión automática

## 🚨 Troubleshooting

### La aplicación no inicia
```bash
# Verificar logs
docker logs sts-ai-app

# Verificar puerto
netstat -tlnp | grep 3000

# Reiniciar servicios
docker compose restart
systemctl restart nginx
```

### Nginx no funciona
```bash
# Verificar configuración
nginx -t

# Verificar estado
systemctl status nginx

# Ver logs
tail -f /var/log/nginx/error.log
```

### Problemas de SSL
```bash
# Renovar certificado
certbot renew

# Verificar certificado
openssl s_client -connect tu-dominio.com:443
```

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker logs sts-ai-app`
2. Verifica el estado: `/usr/local/bin/monitor-sts-ai.sh`
3. Consulta la guía completa: `deployment-guide.md`

## 🔗 Enlaces Útiles

- [Documentación de Docker](https://docs.docker.com/)
- [Documentación de Nginx](https://nginx.org/en/docs/)
- [Documentación de Certbot](https://certbot.eff.org/docs/)
- [Guía de UFW](https://help.ubuntu.com/community/UFW) 