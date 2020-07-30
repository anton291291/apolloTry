FROM node:10.13-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Вторая ступень сборки, поднимем nginx для раздачи статики
FROM nginx:stable-alpine
# Копируем билд из ступени сборки "build-stage" в директорию образа /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
# Копируем конфиг nginx в директорию образа /etc/nginx/nginx.conf (Напишем его позже)
COPY nginx.conf /etc/nginx/nginx.conf
# Открываем 80 порт
EXPOSE 80
# Указываем команду, поднимающую nginx при запуске контейнера
CMD ["nginx", "-g", "daemon off;"]
