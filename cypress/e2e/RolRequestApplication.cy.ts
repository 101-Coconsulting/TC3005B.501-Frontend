import '../support/commands';

describe('Login con diferentes roles y verificación de destino', () => {
  it('Solicitante y N2 ven viaje con destino Venezuela', () => {
    const solicitanteUser = Cypress.env('SOLICITANTE_USER');
    const solicitantePassword = Cypress.env('SOLICITANTE_PASSWORD');

    const n2User = Cypress.env('CYPRESS_N2_USER') || 'test5';
    const n2Password = Cypress.env('CYPRESS_N2_PASSWORD') || 'test';

    const destination = 'Venezuela';

    // === LOGIN COMO SOLICITANTE ===
    cy.login(solicitanteUser, solicitantePassword);
    cy.contains('p', `País Destino: ${destination}`).should('exist');

    // === Logout ===
    cy.logout();

    // Limpieza antes del segundo login
    cy.clearCookies();
    cy.clearLocalStorage();

    // === LOGIN COMO N2 ===
    cy.visit('/login'); // Asegura que está en login antes de intentar escribir
    cy.get('input#username').clear().type(n2User);
    cy.get('input#password').clear().type(n2Password);
    cy.get('form').submit();

    cy.url().should('include', '/dashboard');
    cy.contains('p', `Viaje Rumbo a ${destination}`).should('exist');
  });
});
