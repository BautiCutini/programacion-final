# Setup del Proyecto con Docker

## Requisitos previos

- Docker Desktop instalado ([descargar aquí](https://www.docker.com/products/docker-desktop))
- Git instalado
- Node.js (opcional, solo si corres las apps sin Docker)

## Instrucciones de configuración

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd <nombre-del-proyecto>
```

### 2. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

El archivo `.env` ya contiene los valores por defecto. Si necesitas cambiar algo (puertos, contraseñas, etc.), edítalo en tu editor de texto.

### 3. Levantear los contenedores

```bash
# Levantar todos los servicios
docker compose up -d

# O solo la base de datos y pgAdmin (más rápido)
docker compose up -d database pgadmin
```

### 4. Verificar que todo está corriendo

```bash
docker compose ps
```

## Acceso a los servicios

| Servicio | URL/Puerto | Credenciales |
|----------|-----------|--------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:3001 | - |
| **pgAdmin** | http://localhost:5050 | admin@example.com / admin123 |
| **PostgreSQL** | localhost:5432 | app_user / app_password |
| **Redis** | localhost:6379 | - |
| **Reverse Proxy** | http://localhost:80 | - |

## Comandos útiles

```bash
# Ver logs de un servicio
docker compose logs -f <servicio>

# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (borra la BD)
docker compose down -v

# Reconstruir las imágenes
docker compose build

# Ejecutar comandos dentro de un contenedor
docker compose exec backend npm install
docker compose exec frontend npm install

# Ver uso de recursos
docker stats
```

## Solución de problemas

### Puerto ya en uso
Si ves un error como `Bind for 0.0.0.0:3000 failed`, edita `.env` y cambia los puertos.

### Contenedor sale constantemente
```bash
docker compose logs <servicio>
```

### Borrar todo y empezar de nuevo
```bash
docker compose down -v
docker system prune -a
docker compose up -d
```

### Base de datos no conecta
Asegúrate de que el servicio `database` está healthy:
```bash
docker compose ps
```

## Estructura del proyecto

```
.
├── frontend/              # React app
├── backend/               # Express API
├── database/              # Scripts de inicialización
├── pgadmin/               # Config de pgAdmin
├── caddy/                 # Configuración del reverse proxy
├── docker-compose.yml     # Orquestación de contenedores
├── .env                   # Variables de entorno (no compartir)
├── .env.example           # Plantilla de .env
└── README.md
```

## Notas

- El `.env` **NO debe ser commiteado**. Está en `.gitignore` para proteger secretos.
- Siempre usa `.env.example` como referencia para variables nuevas.
- Hot reload está habilitado: cambios en el código se reflejan automáticamente.
- Los datos de la base de datos persisten en volúmenes de Docker entre sesiones.

---

¿Dudas? Pregunta a tu compañero de equipo. 🚀
