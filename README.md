# Prueba de concepto - Arq orientada a Microservicios

El propósito de esta prueba de concepto (en adelante POC) es mostrar el bajo acoplamiento entre microservicios y la independencia entre ellos para que la baja performance de uno no afecte al resto.

## Requisitos

Este POC fue ejecutado en sistemas operativos Ubuntu 16.04 y superiores.
Herramientas necesarias:
- PHP 7.1 o superior
- NodeJS 10.0 o superior
- MySQL 5.7
- RabbitMQ 3.7.

En caso de no tener (PHP, NodeJS, MySQL o RabbitMQ) ejecutar el archivo `install.sh` que se encargará de la instalación de cada uno de ellos.

<b>Nota</b>: crear el usuario root de MySql con contraseña admin. Caso contrario, modificar archivo `.env.example` dentro de la carpeta `microserviceB` con el usuario y contraseña correctos.

## Configuración
Instalación inicial para realizar correctamente la POC.
- Crear una base de datos llamada `microservice_db`. 
- Dentro de la carpeta `microserviceA` ejecutar el comando `php artisan migrate` que creará una tabla en dicha base llamada `product`.
- Ingresar a `http://localhost:15672/` (usuario `guest` y contraseña `guest`), crear un virtual host llamado `test` y dentro de él una queue llamada `products`.
- Dentro de la carpeta `microserviceA` ejecutar el comando `php artisan serve`.
- Dentro de la carpeta `microserviceB` ejecutar la siguiente sentencia: `npm install && npm start`.
- Dentro de la carpeta `microserviceC` ejecutar el comando `npm install`.

## Ejecución
Pasos para ejecutar la POC propiamente dicha:
- Microservicio A (publica mensajes de productos en una cola de RabbitMQ): mediante el uso de <a href= "https://www.getpostman.com/downloads/" target="_blank">Postman</a> o alguna herramienta similar realizar una petición POST al endpoint `http://localhost:8000/api/public-message` con el siguiente body en formato JSON:
```
"payload": {
    "product": {
        "name": "Product Name",
        "price": 100,
        "stock": 50
    }
}
```
- Microservicio B (expone un consumer que se encarga de procesar los mensajes de la cola publicados por el microservicio A): se observará por consola:
```
> microservicea@1.0.0 start /code/poc-microservices/microserviceB
> node server.js

Server listening on port 3000
 [*] Waiting for messages in products. To exit press CTRL+C
 [x] Received: {"payload":{"product":{"name":"Product Name","price":100,"stock":50}},"timestamp":1574475227}
 [x] Record saved on database

```
Chequear además que se haya guardado un registro en la tabla product de la base de datos que contenga los datos del mensaje envíado.
- Microservicio C (enviará un batch masivo de mensajes: 500 en 10 segundos): ejecutar el comando `node_modules/artillery/bin/artillery run config.yml` y observar por consola:
```
All virtual users finished
Summary report @ 23:12:05(-0300) 2019-11-22
  Scenarios launched:  50
  Scenarios completed: 50
  Requests completed:  50
  RPS sent: 4.86
  Request latency:
    min: 7.2
    max: 49.2
    median: 23.3
    p95: 41.9
    p99: 49.2
  Scenario counts:
    0: 50 (100%)
  Codes:
    200: 50

```
- Microservicio B: se verá por consola la llegada de los 500 mensajes y en la base de datos los nuevos 500 registros de productos.