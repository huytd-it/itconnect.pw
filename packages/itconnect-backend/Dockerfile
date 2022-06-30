FROM node:15.12.0-alpine3.13

WORKDIR /src/backend

# timezone vietnam
ENV TZ=Asia/Ho_Chi_Minh
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# cache node_modules
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD "sh" "./start.sh"