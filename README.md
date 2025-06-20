<<<<<<< HEAD
# 🚀 STS-AI Landing Page

Landing page moderna para servicios de inteligencia artificial con despliegue automatizado en VPS.

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz limpia y profesional
- 📱 **Responsive** - Optimizado para móviles y desktop
- ⚡ **Rendimiento** - Construido con Next.js 14 y Tailwind CSS
- 🔧 **Despliegue Automatizado** - Scripts para VPS sin Docker
- 🛡️ **Seguridad** - Headers de seguridad y SSL automático
- 📊 **Monitoreo** - Logs y monitoreo integrado

## 🛠️ Tecnologías

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Node.js, PM2, Nginx
- **Infrastructure:** Alibaba Cloud Linux

## 🚀 Despliegue Rápido

### Requisitos
- VPS con Alibaba Cloud Linux 3.2104 LTS
- Acceso SSH con key pair

### Instalación
```bash
# 1. Conectar al VPS
ssh -i tu-key.pem root@TU-IP-VPS

# 2. Configurar el servidor
wget https://raw.githubusercontent.com/TU-USUARIO/sts-ai/main/vps-setup-simple.sh
chmod +x vps-setup-simple.sh
./vps-setup-simple.sh

# 3. Clonar y desplegar
cd /var/www
git clone https://github.com/TU-USUARIO/sts-ai.git sts-ai
cd sts-ai
chmod +x deploy-simple.sh
./deploy-simple.sh
```

### Acceso
- **HTTP:** `http://TU-IP-VPS`
- **HTTPS:** `https://tu-dominio.com` (después de configurar SSL)

## 📁 Estructura del Proyecto

```
sts-ai/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   └── lib/             # Utilidades
├── public/              # Archivos estáticos
├── vps-setup-simple.sh  # Configuración del VPS
├── deploy-simple.sh     # Script de despliegue
└── README-SIMPLE.md     # Guía de despliegue
```

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 📊 Monitoreo

```bash
# Estado de la aplicación
pm2 list

# Logs en tiempo real
pm2 logs sts-ai -f

# Monitoreo completo
/usr/local/bin/monitor-sts-ai.sh
```

## 🔄 Actualizaciones

```bash
# Actualización manual
cd /var/www/sts-ai
git pull
./deploy-simple.sh

# Actualización automática (cron)
0 2 * * * cd /var/www/sts-ai && git pull && ./deploy-simple.sh
```

## 🛡️ Seguridad

- ✅ Firewall configurado (puertos 22, 80, 443)
- ✅ Headers de seguridad en Nginx
- ✅ Usuario no-root para la aplicación
- ✅ SSL automático con Let's Encrypt
- ✅ Logs rotados automáticamente

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs: `pm2 logs sts-ai`
2. Verifica el estado: `/usr/local/bin/monitor-sts-ai.sh`
3. Consulta la guía: [README-SIMPLE.md](README-SIMPLE.md)

## 🌟 Características Destacadas

- **Despliegue Simplificado** - Sin Docker, instalación directa
- **Alto Rendimiento** - Optimizado para velocidad
- **Fácil Mantenimiento** - Scripts automatizados
- **Escalable** - Preparado para crecimiento
- **Profesional** - Diseño moderno y funcional

---

**Desarrollado con ❤️ para servicios de IA**
=======
# sts-ai
Landing page para servicios de inteligencia artificial - Despliegue automatizado en VPS
>>>>>>> 657e68a47a770895f9018521ee628387c1dbdf15
