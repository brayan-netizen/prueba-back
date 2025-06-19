# 🛠 Backend - Sistema de Usuarios y Productos

Este proyecto es un backend completo desarrollado con **Node.js v24**, que implementa autenticación segura, manejo de roles y consultas relacionadas con productos y usuarios mediante **GraphQL**. Está desplegado en **Render** y conectado a una base de datos en **MongoDB Atlas**.

---

## 🚀 Tecnologías utilizadas

-   **Node.js v24**
-   **GraphQL** (`graphql`, `express-graphql`)
-   **MongoDB Atlas** (base de datos en la nube)
-   **Mongoose** (ODM para MongoDB)
-   **bcryptjs** (hashing seguro de contraseñas)
-   **jsonwebtoken** (autenticación con JWT)

---

## 🌐 URL de la API GraphQL

Puedes acceder a la API desde:

> [`https://prueba-back-9cpd.onrender.com/graphql`](https://prueba-back-9cpd.onrender.com/graphql)

Compatible con herramientas como **GraphiQL**, **Postman**, **Apollo Studio** o **Insomnia** para probar queries y mutations.

---

## 🔐 Autenticación

-   Inicio de sesión con **correo y contraseña**
-   Generación de **token JWT** para autenticación
-   Middleware para proteger rutas
-   Validación de **permisos por rol**

---

## 👤 Gestión de Usuarios

-   Registrar un nuevo usuario
-   Actualizar usuario por ID
-   Eliminar usuario
-   Ver todos los usuarios
-   Consultar usuario específico por ID

---

## 🛡 Gestión de Roles

-   Crear rol
-   Actualizar rol por ID
-   Eliminar rol
-   Ver todos los roles
-   Consultar rol por ID
-   Asignar permisos personalizados por rol

---

## 🛍 Productos

-   Consultar **producto por `productId`**
-   Consultar **todos los productos** con paginación y filtros de búsqueda

---

## 🔒 Sistema de Roles y Permisos

-   Soporte para múltiples roles por usuario
-   Validación de permisos en cada operación protegida
-   Permisos como: `createUser`, `readUsers`, `deleteUser`, `createRole`, etc.
-   Usuarios con rol `superAdmin` tienen control total
-   Protección para que **el rol `superAdmin` no pueda ser asignado desde el cliente**
-   Permisos se gestionan a través de una lógica centralizada

---

## 🧪 Notas adicionales

-   Todas las rutas protegidas requieren autenticación con JWT
-   El **token** debe enviarse en el header HTTP:
