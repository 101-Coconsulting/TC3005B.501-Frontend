describe('Login como solicitante y verifica Bolivia', () => {
  it('Inicia sesión y verifica viaje con destino Bolivia', () => {
    const user = Cypress.env('SOLICITANTE_USER');
    const password = Cypress.env('SOLICITANTE_PASSWORD');

    cy.visit('/login');
    cy.get('input#username').type(user);
    cy.get('input#password').type(password);
    cy.get('form').submit();

  });
});
