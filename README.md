# [Floorplan Management System](https://floor-plan-management-system.vercel.app/home)
**Administrador de planos para organizaciones estatales.**

El sistema permite gestionar organizaciones, administrar proyectos de construcción y manejar sus planos de forma centralizada.

## Proyecto académico
Este sistema forma parte del trabajo final de la materia **Ingeniería de Aplicaciones Web**, perteneciente a la **Universidad Nacional de la Plata (UNLP)**


## Demo del sistema
![Demo de recorte de plano](https://github.com/Lauty1550/Floorplan-Management-System/releases/download/V.1.0/Demo.gif)


## Características 
- 🏢 **Organizaciones**: creación y administración.
- 📂 **Proyectos**: gestión completa por entidad.
- 🗺️ **Planos**: subida, vista previa y recorte.
- 👥 **Multi-tenant**: cada organización accede solo a sus recursos.

## 🛠️ Tecnologías utilizadas

### Frontend
- React 19  
- React Router DOM  

### Estilos
- Sass (SCSS)  
- Bootstrap 5  

### Manejo de planos
- Cropper.js / react-cropper  
- react-zoom-pan-pinch  

### Formularios
- React Hook Form  

### Notificaciones
- React Toastify  

---

## 🏗️ Arquitectura del Proyecto

El sistema se organiza según una arquitectura **Frontend + Backend + Base de datos**.

### Frontend
Aplicación SPA encargada de:
- Renderizar vistas y navegación
- Gestionar formularios
- Visualización, recorte y zoom de planos  
Comunicación con el backend vía API REST.

---

### Backend (NestJS)
Backend desarrollado con **NestJS**, estructurado por módulos independientes.

Componentes principales:
- **Módulos** por dominio (`organizaciones`, `projectos`, `planos`)
- **Controladores** para manejar endpoints REST
- **Servicios** con la lógica de negocio
- **Schemas** que definen la estructura de datos de cada colección

Incluye validaciones, manejo de entidades y conexión a MongoDB.

---

### Base de Datos (MongoDB Atlas)
Base documental donde se almacenan:
- Organizaciones  
- Proyectos  
- Planos  
- Metadatos de cada plano  

