# FROM ubuntu:16.04 AS build
FROM node:14.17.6 AS build

WORKDIR /src/frontend

# cache node_modules
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD rm -rf /var/frontend ; cp -R /src/frontend/dist/frontend /var/frontend
