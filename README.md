# Backend Node.Js (Microservicios)

## 📝 Observaciones y consideraciones

Después de una ardua investigación, dificultades en la implementación de la librería *Seneca* y su integración con *Express* para la creación de los microservicios, opté por resolver la consigna simulando el bus de comunicaciones como una petción API-REST únicamente dentro de la red de docker. En consecuencia, esta API-REST (business) no está expuesta a la red externa (*localhost* para este caso) y es solo consumible por la API-REST (login) que sí está expuesta a la red externa (desde *localhost*).

Se utilizó una arquitectura en 3 capas (controller-service-repository) para las API-REST y una arquitectura modular del sistema de archivos formando un código limpio con capacidades de reutilización y mantenibilidad.

## 📝 Requisitos para la inicialización del proyecto

1. Contar con docker instalado en el equipo.
2. Generar los archivos *.env*
    Los archivos *.env.example* contienen variables demo que permiten el inicio rápido del proyecto. Dichos archivos se encuentran en:
    Para copiarlos se debe ejecutar el comando `cp .env.example .env` en cada carpeta correspondiente.
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
        1. Requiere JWT en la key `Authorization` del header con formato `Bearer <tokenString>`.
        2. Query params: `{ email?: string, limit?: string, offset?: string}`.
        3. Response: `body: { "status": boolean, "users": User[] }`.

## 📝 Mejoras

1. Implementar un sistema de logs si los errores no fueron *catcheados* correctamente.
2. Validación de los requests con *joi* para un "early-return".
3. Implementar una librería de microservicios para la comunicación entre los servicios. Me terminaría por inclinar por "NestJS-Microservices".
