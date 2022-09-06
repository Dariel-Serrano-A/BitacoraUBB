# Guía de Contribución

## Equipo de Desarrollo
Grupo 7

## Autores

- [Integrante A](@DarielSerrano) - ~~Rol dentro de Equipo~~ - dariel.serrano1601@alumnos.ubiobio.cl
- [Integrante BBBB](@Oskhar-ogg) - ~~Rol dentro de Equipo~~ - oscarecaroc@outlook.com

<!-- ## Estándar de Codificación

### Estilo de Codificación

El estilo de código de este proyecto debe seguir las recomendaciones de los estándares:
- ~~[PSR-1](https://www.php-fig.org/psr/psr-1/)~~
- ~~[PSR-2](https://www.php-fig.org/psr/psr-2/)~~
- ~~[PSR-12](https://www.php-fig.org/psr/psr-12/)~~

### Configuraciones para editores de código

Antes de escribir tu código, verifica que las configuraciones generales de tu editor estén ajustados de la siguiente manera:

- Final/Salto de Línea (EOL - End of Line ) = LF,CRLF
- Codificación de Archivos de Código (Encoding - Charset) = UTF-8, ISO-8859-1
- Tabulación =

### Editor Config

Busca e instala [Editor Config](https://editorconfig.org/), como plugin para tu IDE o Editor de Código, y de esta forma, automáticamente se configurarán las opciones para editores de código mencionadas anteriormente.

## Desarrollo del código

### Arquitectura del Sistema - Patrones de Diseño

- ~~El proyecto se compone de las capas: .....~~
- ~~Para conectar a la base de datos debes....~~
- ~~Para utilizar las dependencias externas debes...~~

### Namespaces para Autoload con el estándar PSR-4

- Todos los archivos de desarrollo deben ser clases y cada uno debe ser declarado con su respectivo namespace, de acuerdo al directorio en que se encuentre la clase.


### Analizar código desarrollado con PHPCodeSniffer

Para verificar el cumplimiento del [Estándar de Codificación](#estándar-de-codificación), con una terminal interactiva del contenedor, cambiar al directorio web document root (Apache):
```bash
cd /var/www
```

Analizar un directorio o un archivo del proyecto que fue modificado:
```bash
phpcs ruta/directorio/archivo.extension
```

Reparar los errores que son posibles de corregir de forma automática
```bash
phpcbf ruta/directorio/archivo.extension
```

### Analizar código de los tests Unitarios y tests de Integración con PHPUnit

Con una terminal interactiva del contenedor, cambiar al directorio web document root (Apache):
```bash
cd /var/www
```

Analizar todos los test del proyecto:
```bash
# Reporte Resumido
phpunit

# Reporte Detallado
phpunit --testdox

# Reporte cobertura de código
phpunit --coverage-html phpunit/
```

## Interacción con el repositorio

1. Crear una issue y una nueva rama a partir de master
    - Describir y listar las tareas que serán desarrolladas
    - Agregar la issue al milestone correspondiente
    - Etiquetar la issue con todos los labels relacionados
    - Mover la issue al tablero correspondiente del issue board
1. Desarrollar el código en la nueva rama creada
    - Realizar los commit's en la rama de la issue
    - Mencionar en el mensaje del commit el numero de issue
1. Construir los test unitarios y de integración que comprueben el funcionamiento de tu desarrollo, y evitar que por accidente tu nuevo código pueda romper el resto de funcionalidades del sistema
1. Enviar tu código al repositorio, solo cuando los test estén en verde, y abrir un Merge Request
    - Describir que cosas se integrarán a la rama master
    - Describir los criterios de aceptación y revisión del código y los cambios
    - Agregar el MR al milestone correspondiente
    - Etiquetar MR con todos los labels relacionados
    - Mencionar la issue en la descripción del MR
    - Si el MR contiene los cambios que completan la totalidad de las tareas descritar en la issue, agregar 'Closes Issue #123'
1. Esperar la aprobación por parte de los [Maintainer's](#equipo-de-desarrollo) de este repositorio para la integración de tú código a la rama master


### Archivos/Directorios que no deben ser versionados o enviados al repositorio (**no** incluir en los **commit's**)

- `config/*`
- `vendor/*`

### Archivos/Directorios que no deben estar en ambientes de producción

- `docker/*`
- `composer.lock`
- `README.md`
- `.gitignore`
- `.git/*`
 -->