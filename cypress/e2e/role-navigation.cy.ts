describe('Validación de acceso a rutas restringidas', () => {
  beforeEach(() => {
    cy.login(Cypress.env('CPP_USER'), Cypress.env('CPP_PASSWORD'));
  });

  it('debe denegar el acceso a la ruta /crear-solicitud mostrando error 404', () => {
    cy.request({
      url: '/crear-solicitud',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('debe redirigir al login si se intenta acceder a /crear-solicitud sin autenticación', () => {
    cy.logout();
    cy.request({
      url: '/crear-solicitud',
      failOnStatusCode: false,
    });
    cy.url().should('include', '/login');
  });
});
