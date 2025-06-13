describe('Mensaje de error al dejar campos obligatorios vacíos', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
    cy.contains('SOLICITA UN NUEVO VIAJE').should('exist').click();
  });

  it('debe mostrar una advertencia cuando se deja un campo obligatorio vacío', () => {
    cy.get('form').should('be.visible');

    cy.get('input[name="origin_country_name"]').eq(0).type('México');
    cy.get('input[name="origin_city_name"]').eq(0).type('Ciudad de México');
    cy.get('input[name="destination_country_name"]').eq(0).type('Estados Unidos');
    cy.get('input[name="destination_city_name"]').eq(0).type('Nueva York');
    cy.get('input[name="beginning_date"]').eq(0).type('2025-07-01');
    cy.get('input[name="beginning_time"]').eq(0).type('09:00');
    cy.get('input[name="ending_date"]').eq(0).type('2025-07-05');
    cy.get('input[name="ending_time"]').eq(0).type('17:00');
    cy.get('input[name="requested_fee"]').type('1500');
    // El campo 'notas' se deja vacío intencionadamente

    cy.get('form').contains('button', 'Enviar Solicitud').click();

    cy.get('div.bg-red-200.text-red-800')
      .should('be.visible')
      .and('contain', 'Por favor, completa todos los campos requeridos de forma correcta antes de enviar la solicitud.');

    cy.url().should('include', '/crear-solicitud');
  });
});
