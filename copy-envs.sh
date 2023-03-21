#! /bin/bash

# copiar el .env.example de ./business
cd ./business
cp .env.example .env

# copiar el .env.example de ./Dockerfiles
cd ../Dockerfiles
cp .env.example .env

# copiar el .env.example de ./login
cd ../login
cp .env.example .env
