FROM nginx:alpine

# Copiar los archivos del frontend al directorio de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80 para que Nginx sirva el frontend
EXPOSE 80
