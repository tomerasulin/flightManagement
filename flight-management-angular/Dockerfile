# Stage 1 (Angular)
FROM node:18-alpine as angular

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install ngx-socket-io

COPY . .

RUN npm run build

# Stage 2 (Nginx)
FROM nginx:stable-alpine

COPY --from=angular /app/dist/flight-management-angular/browser/ /usr/share/nginx/html

EXPOSE 80
