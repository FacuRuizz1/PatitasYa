# 🐾 PatitasYa

Plataforma web **Full Stack** para **reportar mascotas perdidas, encontradas o en adopción** 🐶🐱  
Conectando personas para ayudar a que más mascotas vuelvan a casa ❤️

---

## 📋 Descripción

**PatitasYa** es una aplicación web que permite a los usuarios:

- Publicar reportes de mascotas (perdidas / encontradas / adopción).
- Subir imágenes para mejorar la identificación.
- Gestionar publicaciones de forma segura mediante autenticación.
- Consumir una API REST construida con Spring Boot.

---

## ✨ Características

- 🔐 **Autenticación y autorización con JWT**
- 👤 Registro / login de usuarios
- 🐶🐱 Publicación de reportes de mascotas (CRUD)
- 🖼️ **Carga de imágenes** (integración con **Cloudinary**)
- 🧾 Validaciones de datos (Spring Validation)
- 🔒 Endpoints protegidos con **Spring Security**
- 📄 Documentación de API con **OpenAPI / Swagger UI**
- 📱 Interfaz web con Angular + Bootstrap (responsive)

---

## 🚀 Tecnologías Utilizadas

### Frontend
- **Angular** (proyecto generado con Angular CLI)
- **TypeScript**
- **Bootstrap 5**
- **@auth0/angular-jwt** (manejo de tokens en el cliente)
- **HTML / CSS**

### Backend
- **Java 17**
- **Spring Boot** (starter parent)
- **Spring Web MVC**
- **Spring Data JPA**
- **Spring Security**
- **JWT (jjwt)**
- **PostgreSQL** (runtime)
- **Cloudinary** (subida/gestión de imágenes)
- **Springdoc OpenAPI (Swagger UI)**


---

## 📦 Requisitos Previos

### General
- **Git**
- **Node.js** (recomendado: 18+)
- **npm** (o yarn)
- **Java JDK 17**
- **Maven** (o usar Maven Wrapper `mvnw`)
- **PostgreSQL** en ejecución (local o remoto)
- Cuenta de **Cloudinary** (para credenciales)

---

## ⚙️ Instalación y Ejecución

### 1) Clonar el repositorio
```bash
git clone https://github.com/FacuRuizz1/PatitasYa.git
cd PatitasYa
```

---

## 🧠 Backend (Spring Boot)

### 2) Configurar variables / properties

El backend está en:
```bash
Backend/patitasya
```

Asegurate de configurar tus credenciales en un archivo de configuración (por ejemplo `application.properties` o `application.yml`).

Ejemplo **orientativo** (adaptalo a tus nombres reales de properties y a tu entorno):

```properties
# Server
server.port=8080

# Database (PostgreSQL)
spring.datasource.url=jdbc:postgresql://localhost:5432/patitasya
spring.datasource.username=postgres
spring.datasource.password=tu_password
spring.jpa.hibernate.ddl-auto=update

# JWT
jwt.secret=tu_clave_secreta
jwt.expiration=86400000

# Cloudinary
cloudinary.cloud_name=tu_cloud_name
cloudinary.api_key=tu_api_key
cloudinary.api_secret=tu_api_secret
```

### 3) Levantar el backend
Con Maven:
```bash
cd Backend/patitasya
mvn clean install
mvn spring-boot:run
```

O con Maven Wrapper:
```bash
cd Backend/patitasya
./mvnw spring-boot:run
```

Backend disponible en:
- `http://localhost:8080`

Swagger / OpenAPI (si está habilitado):
- `http://localhost:8080/swagger-ui/index.html`

---

## 🎨 Frontend (Angular)

El frontend está en:
```bash
Frontend/patitasya
```

### 4) Instalar dependencias
> Importante: en tu repo existe `Frontend/node_modules` versionado. Lo recomendable es **no commitear** `node_modules`, pero para ejecutar local, instalá igual dependencias en el proyecto Angular.

```bash
cd Frontend/patitasya
npm install
```

### 5) Configurar endpoint del backend
Si tenés environments, configurá el `apiUrl` apuntando a tu backend, por ejemplo:
- `http://localhost:8080`

### 6) Ejecutar el frontend
```bash
ng serve
```

Frontend disponible en:
- `http://localhost:4200`

---

## 🔐 Seguridad

- **JWT** para autenticación (tokens)
- **Spring Security** para proteger endpoints
- Validación de requests con **Spring Validation**
- Recomendación: manejar secretos con variables de entorno y no hardcodearlos











