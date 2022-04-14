FROM node:15.12.0-alpine3.13

WORKDIR /src/frontend

# cache node_modules
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# remove folder pj and copy dist
RUN cp -r /src/frontend/dist/frontend /var/dist
RUN rm -rf /src/frontend

# clear volume & copy dist to volume
CMD rm -rf /var/frontend/* ; cp -r /var/dist /var/frontend
