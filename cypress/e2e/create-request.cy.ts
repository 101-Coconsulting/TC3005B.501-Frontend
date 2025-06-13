describe('Creación de una solicitud de viaje por el solicitante', () =>{
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  afterEach(() => {
    cy.logout();
  });

  it('debe permitir completar y enviar exitosamente una nueva solicitud de viaje', () => {
    cy.contains('SOLICITA UN NUEVO VIAJE').should('exist').click();
    cy.url().should('eq', 'https://localhost:4321/crear-solicitud');

    cy.get('input[placeholder*="País Origen"]').type('México');
    cy.get('input[placeholder*="Ciudad Origen"]').type('CDMX');
    cy.get('input[placeholder*="País Destino"]').type('EEUU');
    cy.get('input[placeholder*="Ciudad Destino"]').type('Nueva York');

    cy.get('input[name="beginning_date"]').type('2025-10-12');
    cy.get('input[name="ending_date"]').type('2025-10-20');

    cy.get('input[name="beginning_time"]').type('10:23');
    cy.get('input[name="ending_time"]').type('23:00');

    cy.get('input[name="plane_needed"]').click();
    cy.get('input[name="hotel_needed"]').click();

    cy.get('input[placeholder*="Anticipo Esperado (MXN)"]').type('10000');
    cy.get('textarea[name="notes"]').type('Esta solicitud fue creada con una prueba Cypress :)')

    cy.contains('Enviar Solicitud').should('exist').click();
    cy.url().should('eq', 'https://localhost:4321/dashboard')
  })

})