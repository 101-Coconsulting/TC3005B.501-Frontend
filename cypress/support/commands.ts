declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }
}

declare namespace Cypress {
  interface Chainable {
    logout(): Chainable<void>;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('https://localhost:4321');
  cy.clearCookies();
  cy.clearLocalStorage();

  cy.get('input[placeholder*="Usuario"]').type(username);
  cy.get('input[placeholder*="Contraseña"]').type(password + '{enter}');

  cy.on('window:alert', (text) => {
    expect(text).to.contains('Inicio de sesión exitoso');
  });

  cy.on('window:confirm', () => true);
  cy.url().should('include', 'dashboard');
});

Cypress.Commands.add('logout', () => {
  cy.wait(1000);
  cy.get('span.material-symbols-outlined').contains('logout').click();
  cy.contains('button', 'Cerrar Sesión').should('be.visible').click();
  cy.url().should('include', '/login');
});
