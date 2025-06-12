describe('Eliminar solicitud de viaje', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  it('Eliminar solicitud la primera solicitud listada en estado PRIMERA REVISIÓN', () =>{
    cy.contains('PRIMERA REVISIÓN').first().parent().within(()=> {
      cy.get('span[class="material-symbols-outlined text-black cursor: pointer"]').should('exist').click({force: true});
    });

    cy.contains('Cancelar Solicitud').should('be.visible');
    cy.contains('¿Estás seguro de que deseas cancelar esta solicitud?').should('be.visible')

    cy.contains('Confirmar').click();

    cy.url().should('eq', 'https://localhost:4321/dashboard')
    });
});