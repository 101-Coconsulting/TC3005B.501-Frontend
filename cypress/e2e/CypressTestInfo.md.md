# Información sobre las pruebas automáticas con Cypress
## Este proyecto utiliza Cypress para realizar pruebas end-to-end automatizadas de las funcionalidades del sistema.

### *Estructura del proyecto*

```tree
/cypress
├── e2e/ # Contiene todos los archivos de pruebas
├── support/
│ ├── commands.ts # Define comandos personalizados, como el login
│ └── e2e.ts # Importa comandos y se registra automáticamente
└── cypress.config.ts # Configuración principal de Cypress
```

### *Manejo de Login*

Todas las pruebas que requieren autenticación hacen uso de un comando personalizado cy.login, el cual se encuentra definido en:

`cypress/support/commands.ts`

Comando de login:

```ts
beforeEach(() => {
    cy.login(Cypress.env('USER'), Cypress.env('PASSWORD'));
});
```

Este comando automatiza el flujo de login para cualquier usuario que tenga credenciales válidas.

### *Variables de entorno y credenciales*

Las credenciales de usuarios se manejan mediante variables de entorno definidas en un archivo .env (que no debe subirse al repositorio por razones de seguridad).
Pueden ver el formato del archivo `.env` en el `.env.example` que se encuentra en la raíz del proyecto.

Estas variables son cargadas desde cypress.config.ts:

Y se accede a ellas desde las pruebas con Cypress.env(...), por ejemplo:

```ts
cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
```

### *Cómo ejecutar las pruebas*
Ejecutar Cypress en modo interactivo:

```bash
npx cypress open
```
Ejecutar pruebas en consola (modo headless para e2e):

```bash
npx cypress run --e2e
```