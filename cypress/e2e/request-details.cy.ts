describe('Visualización de detalles de una solicitud de viaje', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  afterEach(() => {
    cy.logout();
  });

  it('debe permitir acceder a la vista de detalles desde la lista de solicitudes', () => {
    cy.get('a[href^="/detalles-solicitud/"]').first().click();
    
    cy.contains('Detalles del Usuario').should('be.visible');
    cy.url().should('include', '/detalles-solicitud/');
  });
});