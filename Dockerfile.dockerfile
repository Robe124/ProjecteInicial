FROM php:8.0-fpm

WORKDIR /var/www/html

COPY . /var/www/html

EXPOSE 9000
