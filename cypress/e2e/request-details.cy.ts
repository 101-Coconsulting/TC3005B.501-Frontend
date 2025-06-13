describe('El solicitante debe lograr visualizar los detalles de una solicitud', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  it('Debe tener acceso a los detalles de una solicitud',() =>{
    cy.get('a[href^="/detalles-solicitud/"]').first().click();
    cy.contains('Detalles del Usuario');
    cy.url().should('include', '/detalles-solicitud/');
  })
});