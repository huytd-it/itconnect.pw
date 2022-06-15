FROM node:15.12.0-alpine3.13

WORKDIR /src/backend

# cache node_modules
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm run seq:prod db:migrate

EXPOSE 80

CMD "npm" "run" "start:prod"