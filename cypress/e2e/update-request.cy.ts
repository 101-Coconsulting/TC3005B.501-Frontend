describe('Edición de una solicitud existente desde el perfil del solicitante', () =>{
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  it('debe lograr modificar y guardar los cambios de los datos correctamente', () => {
    cy.get('button:enabled').contains('EDITAR').first().click();

    cy.get('input[placeholder*= "Ciudad Origen"]').first().clear().type('Monterrey');
    cy.get('input[placeholder*= "Ciudad Destino"]').first().clear().type('Chicago');

    cy.get('textarea[name=notes').clear().type('Esta solicitud fue modificada por una prueba de Cypress');

    cy.contains('Actualizar Solicitud').should('exist').click();
    cy.url().should('eq', 'https://localhost:4321/dashboard')
    cy.logout();
  });
});