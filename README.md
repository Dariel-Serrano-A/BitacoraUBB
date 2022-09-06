~Bitácoras UBB Face~

~Este proyecto intenta hacer menos tediosa la tarea de documentar manualmente y en papel las bitácoras de prácticas ,
permitiendo el registro digital de los datos y mostrándolos de forma ordenada y filtrable,
está dirigida a los alumnos practicantes, 
y es realizada con TypeScript, node y angular mayormente~

## Software stack
El proyecto Bitacoras UBB Face es una aplicación web que corre sobre el siguiente software:

- ~Ubuntu 18.04~
- ~Apache @latest~
- ~NodeJS 16.15.0~
- ~Angular/cli 14.1.0~
- ~Base de Datos MySQL 5 ~

## Configuraciones de Ejecución para Entorno de Desarrollo/Produccción

~Realizar una descarga de paquete 'sudo apt install git', para luego poder a través de 
'git clone <nombre_de_repositorio>' se pueda traer el código del repositorio

para desarrollo, instalar las dependencias globales usando 
'apt-get install -g -y nodejs npm@latest typescript apache2', 

luego las del backend dirigiéndose antes desde el directorio BitacorasUBB, hacia server,
'cd BitacorasUBB/server', 
'npm i express morgan mysql2 cors concurrently path formidable @types/multer uuid @types/uuid 
fs-extra @types' fs-extra' 

y ahora dirigiéndose al directorio client.new,
'cd ~' luego 'cd BitacorasUBB/client.new', siguiente las dependencias del frontend,
'npm i @angular/cli sweetalert2 bootstrap@v5.2.0 bootswatch @syncfusion/ej2-angular-schedule --save && ng add angular-datatables'

para arrancar el desarrollo de server y client.new ocupar:
server: npm run dev
client.new: ng serve --host 0.0.0.0

para arrancar en producción el frontend ejecutar en client.new, 'ng build' para obtener un directorio /dist o si ya existe, copiar su contenido al directorio /var/www/html para arrancarlo con apache a través de 
'service apache2 start'

para arrancar el backend simplemente en la carpeta BitacorasUBB/server ejecutar 'node build/index.js'~


### Credenciales de Base de Datos y variables de ambiente
- Editar el archivo `src/keys.ts` y `build/keys.js` para operar las credenciales
- **IMPORTANTE**: Por razones de Seguridad **NUNCA** debes guardar las credenciales y subirlas al repositorio


### ~Docker, Máquina Virtual, Sistema Operativa~
Con una terminal situarse dentro del directorio raiz donde fue clonado este repositorio, por ej: `~/BitacorasUBB/`.
Una vez situado en la raiz del proyecto, dirigirse al directorio `docker` y ejecutar lo siguiente para construir la imagen docker:

```bash
docker build -t BitacorasUBB:version1.0 .

```

Una vez construida la imagen, lanzar un contenedor montando un volumen que contenga el código del repositorio, en el directorio /var/www/html del contenedor.

```bash
docker run --rm -ti -p 80:80 -v /home/usuario/BitacorasUBB/:/var/www/html mi-proyecto:version1.0 bash
```


Iniciar el servicio de Apache Http Server

```bash
service apache2 start
```

Iniciar el servicio de NodeJS

```bash
nodejs index.js
```


### Instalar dependencias del proyecto

Cambiar al directorio web document root (Apache) del contenedor:
```bash
cd /var/www/html
```

Instalar las dependencias del proyecto con composer
```bash
npm install
```

Cambiar permisos para permitir la correcta ejecución de la aplicación en entorno local
```bash
chmod -R 777 web/assets/ logs/ cache/
```

Ir a un navegador web y ejecutar la siguiente url [BitacorasUBB](http://localhost/bitacoras)

## Construido con

- ~[NPM](https://www.npmjs.com/) - Dependency Management~
- ~[Bootstrap 5](https://getbootstrap.com/) - HTML, CSS, and JS Frontend Framework~

## Licencia

Este proyecto fue construido con la licencia AAA, - ver [LICENSE.md](LICENSE.md) para mayor información


## Contribuir al Proyecto

- Por favor lea las instrucciones para contribuir al proyecto en [CONTRIBUTING.md](CONTRIBUTING.md)

## Agradecimientos

- Basado en el códigos de ejemplo de Fazt,'https://www.youtube.com/c/FaztTech'