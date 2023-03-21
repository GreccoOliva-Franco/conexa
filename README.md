# Backend Node.Js (Microservicios)

Este trabajo práctico tiene como objetivo principal conocer las mejores prácticas del candidato, para ello se solicita tomarse el tiempo de leer bien la consigna y entregar el mejor desarrollo posible. Todo componente agregado será considerado como un **`Plus`**.

### 🤔 **Antes de arrancar, debes tener en cuenta:**

- Se espera que la persona sea creativa 🎨
- Programe de forma componentizada y ordenada 🏗️
- Respete los request que pedimos 🤓
- Se espera que no sea un trabajo de mas de 8 horas, 12 horas como mucho ⏰

## 📝 Consigna

---
Requisitos de entrega:

1. 💡 **Obligatorio:** Recorda abrir un repositorio público (puede ser Github, Gitlab, Bitbucket…) 
2. **Nice to Have:** Deseable que el proyecto esté deployado en un server (gratuito)
3. **Nice to Have:** Deseable que el proyecto tenga testings

Requisitos técnicos:

1. Crear un proyecto llamado “**API**”.
2. El proyecto debe ser creado en **Node** con **Express**.
3. Implementar una librería de MicroServicios a elección.
4. Crear **`2 módulos`** en el proyecto:
    1. **Micro Servicio de Log In** → que comprende los siguientes endpoints:
        1. **Endpoint 1**: Registrar usuario con lo siguientes campos (no requiere JWT):
            1. Mail
            2. Password
        2. **Endpoint 2**: Autenticación de usuarios previamente creado en el punto a) i) (No requiere JWT, pero si debe generar uno en el response.)
        3. **Endpoint 3** : Listar usuarios (Requiere JWT y llama al al modulo de Negocios al endpoint b) i)
    2. **Micro Servicio de Negocios:**
        1. **Endpoint 4**: Listar usuarios (Requiere JWT)
            1. Debe permitir visualizar todos los usuarios registrados
            2. Debe tener paginación
            3. Debe permitir buscar de manera no sensitiva por el mail
5. BBDD: **MongoDB**
6. Condiciones:
    1. Los endpoints 1, 2 y 3 → deben de poder ser accesibles desde el local host
    2. **Endpoint 4**: Solo es accesible por medio del endpoint 3, no se debe poder acceder al mismo por el endpoint 3

## 📝 Observaciones y consideraciones

Después de una ardua investigación, dificultades en la implementación de la librería *Seneca* y su integración con *Express* para la creación de los microservicios, opté por resolver la consigna simulando el bus de comunicaciones como una petción API-REST únicamente dentro de la red de docker. En consecuencia, esta API-REST (business) no está expuesta a la red externa (*localhost* para este caso) y es solo consumible por la API-REST (login) que sí está expuesta a la red externa (desde *localhost*).

Se utilizó una arquitectura en 3 capas (controller-service-repository) para las API-REST y una arquitectura modular del sistema de archivos formando un código limpio con capacidades de reutilización y mantenibilidad.

## 📝 Requisitos para la inicialización del proyecto

1. Contar con docker instalado en el equipo.
2. Generar los archivos *.env*
    Para ello, nos paramos en la raiz del proyecto y ejecutamos el comando `sh copy-envs.sh`. Este comando copia los archivos *.env.example* a su correspondiente hermano *.env* en el mismo directorio en el que encuentra ese archivo *.env.example*. Los archivos *.env.example* contienen variables demo que permiten el inicio rápido del proyecto. Dichos archivos se encuentran en:
    1. *./Dockerfiles/.env.example*
    2. *./login/.env.example*
    3. *./business/.env.example*

## 📝 Inicialización del proyecto

Asegurarse de cumplir los requisitos listados anteriormente.

1. Levantar el proyecto
    1. Movernos a la carpeta correspondiente con el comando `cd Dockerfiles` y ejecutar el comando `docker-compose up -d`.
2. Esperar a que se levanten los contenedores.
3. Testear la aplicación manualmente:
    Se encuentran expuestos los siguientes endpoints:
    1. POST `http://localhost:3000/api/auth/sign-up`.
        1. Endpoint público.
        2. Body: `{ "email": string, "password": string }`.
    2. POST `http://localhost:3000/api/auth/sign-in`.
        1. Endpoint público.
        2. Body: `{ "email": string, "password": string }`.
        3. Response: `{ "status": boolean, "token": { "value": string, "type": "Bearer" } }`.
    3. GET `http://localhost:3000/api/users`.
        1. Requiere JWT en la key `Authorization` del header con formato `Bearer + <tokenString>`.
        2. Query params: `{ email?: string, limit?: string, offset: string}`.
        3. Response: `body: { "status": boolean, "users": User[] }`.

## 📝 Mejoras

1. Implementar un sistema de logs si los errores no fueron *catcheados* correctamente.
2. Validación de los requests con *joi* para un "early-return".
3. Implementar una librería de microservicios para la comunicación entre los servicios. Me terminaría por inclinar por "NestJS-Microservices".