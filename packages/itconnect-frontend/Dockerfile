# FROM ubuntu:16.04 AS build
FROM node:14.17.6 AS build

WORKDIR /src/frontend

# cache node_modules
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/frontend/dist/frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
