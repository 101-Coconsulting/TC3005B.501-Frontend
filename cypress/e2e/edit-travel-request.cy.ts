describe('Edit Travel Request', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));

    // Navigate to the draft requests page
    cy.get('a[href="/solicitudes-draft"]').click();
    cy.url().should('include', 'solicitudes-draft');

    // Select the first draft request to edit
    cy.get('a[href^="/completar-draft/"]').first().click();
    cy.url().should('include', '/completar-draft/');
  });

  it('should edit and update a travel request successfully', () => {
    // Update the first route's destination
    cy.get('input[name="destination_country_name"]').first().clear().type('Estados Unidos');
    cy.get('input[name="destination_city_name"]').first().clear().type('Nueva York');

    // Update the travel dates and times
    cy.get('input[name="beginning_date"]').first().clear().type('2025-07-01');
    cy.get('input[name="beginning_time"]').first().clear().type('08:00');
    cy.get('input[name="ending_date"]').first().clear().type('2025-07-10');
    cy.get('input[name="ending_time"]').first().clear().type('18:00');

    // Update the requested fee
    cy.get('input[name="requested_fee"]').clear().type('7500');

    // Update the notes
    cy.get('textarea[name="notes"]').clear().type('Asistir a una conferencia internacional en Nueva York.');

    // Add a new route
    cy.contains('button', '+ Agregar Ruta a mi Viaje').click();
    cy.get('input[name="origin_country_name"]').last().type('México');
    cy.get('input[name="origin_city_name"]').last().type('Ciudad de México');
    cy.get('input[name="destination_country_name"]').last().type('Canadá');
    cy.get('input[name="destination_city_name"]').last().type('Toronto');
    cy.get('input[name="beginning_date"]').last().type('2025-07-15');
    cy.get('input[name="beginning_time"]').last().type('09:00');
    cy.get('input[name="ending_date"]').last().type('2025-07-20');
    cy.get('input[name="ending_time"]').last().type('17:00');

    // Save the changes
    cy.contains('button', 'Guardar Cambios').click();

    

    // Verify success alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Cambios guardados exitosamente');
    });
    

    // Ensure redirection to the dashboard
    cy.url().should('include', '/solicitudes-draft');
  });

  it('should show an error if required fields are missing', () => {
    // Clear required fields
    cy.get('input[name="destination_country_name"]').first().clear();
    cy.get('input[name="destination_city_name"]').first().clear();
    cy.get('input[name="beginning_date"]').first().clear();
    cy.get('input[name="beginning_time"]').first().clear();
    cy.get('input[name="requested_fee"]').first().clear();
    cy.get('textarea[name="notes"]').first().clear();

    // Attempt to save the changes *no estoy segura de esto *
    cy.contains('button', 'Guardar Cambios').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Hubo un error al completar la solicitud');
    });
    // Verify error message
    
  });
});