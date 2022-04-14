FROM node:14.18.1-alpine3.14

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
# on alpine "cp -r /var/dist /var/frontend" err. fixed: "cp -r /var/dist/* /var/frontend"
CMD rm -rf /var/frontend/* ; cp -r /var/dist/* /var/frontend
