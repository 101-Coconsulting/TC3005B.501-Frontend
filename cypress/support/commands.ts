declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('https://localhost:4321');

  cy.get('input[placeholder*="Usuario"]').type(username);
  cy.get('input[placeholder*="Contraseña"]').type(password + '{enter}');

  cy.on('window:alert', (text) => {
    expect(text).to.contains('Inicio de sesión exitoso');
  });

  cy.on('window:confirm', () => true);

  cy.url().should('include', 'dashboard');
});
