// Handler para evitar que errores no capturados detengan los tests de Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Pruebas de UI responsiva y flujo de login
describe('Responsive UI and Login Flow', () => {
  const devices = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'iPad-2', preset: 'ipad-2' },
    { name: 'iPhone-X', preset: 'iphone-x' },
    { name: 'Galaxy S5', preset: 'samsung-s10' },
  ];

  beforeEach(() => {
    // Limpia las cookies antes de cada test
    cy.clearCookies();
  });

  it('Login page adapts to different device sizes', () => {
    // Prueba la responsividad de la página de login
    cy.visit('/login');
    devices.forEach((device) => {
      if (device.preset) {
        cy.viewport(device.preset); // Cambia el viewport al dispositivo
      } else {
        cy.viewport(device.width, device.height);
      }
      // Verifica que los elementos principales del login existan
      cy.get('form').should('be.visible');
      cy.get('input#username').should('be.visible');
      cy.get('input#password').should('be.visible');
      cy.contains('Login');
    });
  });

  it('Logs in and dashboard adapts to different device sizes', () => {
    // Prueba el login y la responsividad del dashboard
    cy.visit('/login');
    cy.get('input#username').type('Solicitante101');
    cy.get('input#password').type('123');
    cy.get('form').submit();
    cy.url().should('include', '/dashboard');
    cy.wait(500); // Espera para asegurar que el dashboard cargue

    // Debug: revisar las cookies después del inicio de sesión
    cy.getCookie('user_id').then((cookie) => {
      cy.log('user_id cookie:', cookie);
    });
    cy.getCookie('role').then((cookie) => {
      cy.log('role cookie:', cookie);
    });
    devices.forEach((device) => {
      if (device.preset) {
        cy.viewport(device.preset); // Cambia el viewport al dispositivo
      } else {
        cy.viewport(device.width, device.height);
      }
      // Verifica que el dashboard exista y muestre el texto esperado
      cy.get('main, [data-testid="dashboard"], [class*=dashboard]').should('exist');
      cy.contains(/BIENVENIDO/i);
    });
  });
});