# Proyecto Astro - Estructura de src/

Este proyecto busca seguir una organización modular dentro de la carpeta src/ es por ello que se ha decidido crear una estructura de carpetas que permita mantener un código limpio y fácil de mantener, (que tiene mucho que ver con los estándares de código limpio que se hicieron).


## Estructura de Carpetas

`assets/`

Almacena recursos estáticos como imágenes, fuentes y cualquier otro archivo multimedia que sea necesario en el proyecto.

`components/`

Contiene componentes reutilizables de la interfaz de usuario, cualquier elemento de presentación modular. Tales como botones, formularios, tarjetas, etc.

`consts/`

Define constantes globales y configuraciones del proyecto, como valores predeterminados o configuraciones generales.

`layouts/`

Incluye los diseños generales que serán la base persé para las páginas, como estructuras de encabezado, pie de página y navegación global.

`lib/`

Aquí se almacenan módulos reutilizables, funciones auxiliares y cualquier código compartido que no pertenezca a una categoría específica, no es algo reutilizable sino más bien específico compartido por muchos componentes.

`pages/`

Contiene las páginas principales del proyecto. En Astro, cada archivo dentro de pages/ se convierte en una ruta de la aplicación, es decir que un subdirectorio dentro de pages/ se convierte en una ruta anidada.

`styles/`

Almacena archivos de estilos globales o utilidades CSS, como definiciones de Tailwind, variables CSS o estilos específicos apoyados por los `@themes` de Tailwind.

`types/`

Define tipos y estructuras de datos en TypeScript para asegurar consistencia y seguridad en el tipado del código.

`utils/`

Incluye funciones auxiliares y herramientas que facilitan la manipulación de datos, formatos y lógica repetitiva.


## Carpeta public fuera de src/

`public/`

Esta carpeta contiene archivos estáticos accesibles directamente desde el navegador, como imágenes, favicons y fuentes. A diferencia de assets/, los archivos aquí no son procesados por Astro y pueden ser referenciados con rutas absolutas.


Sigan estas recomendaciones para tener una buena organización que permite mantener un código limpio, modular y fácil de mantener entre todos.

