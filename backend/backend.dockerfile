FROM php:8.1-apache

# Instalar extensiones adicionales de PHP (mysqli, pdo_mysql para MySQL)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copiar los archivos del backend al directorio de Apache
COPY . /var/www/html/

# Exponer el puerto 80 para que Apache sirva el backend
EXPOSE 80
