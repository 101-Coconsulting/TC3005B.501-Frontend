
// Author: Julia Maria Stephanie Duenkelsbuehler Castillo y Jose Antonio González Martínez

import 'cypress-file-upload';

describe('Edit Travel Request', () => {
  beforeEach(() => {
    // Navigate to the login page
    cy.visit('https://localhost:4321');

    // Log in with valid credentials
    cy.get('input[placeholder="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder="Contraseña"]').type('andres123{enter}');

    // Verify successful login
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', () => true);

    // Ensure redirection to the dashboard
    cy.url().should('include', 'dashboard');

    // Navigate to the draft requests page
    cy.get('a[href="/solicitudes-draft"]').click();
    cy.url().should('include', 'solicitudes-draft');

    // Select the first draft request to edit
    cy.get('a[href^="/editar-solicitud/"]').first().click();
    cy.url().should('include', '/editar-solicitud/');
  });

  it('should edit and update a travel request successfully', () => {
    // Update the first route's destination
    cy.get('input[name="destination_country_name"]').clear().type('Estados Unidos');
    cy.get('input[name="destination_city_name"]').clear().type('Nueva York');

    // Update the travel dates and times
    cy.get('input[name="beginning_date"]').clear().type('2025-07-01');
    cy.get('input[name="beginning_time"]').clear().type('08:00');
    cy.get('input[name="ending_date"]').clear().type('2025-07-10');
    cy.get('input[name="ending_time"]').clear().type('18:00');

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
    cy.contains('button', 'Actualizar Solicitud').click();

    // Confirm the action
    cy.contains('button', 'Confirmar').click();

    // Verify success alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Cambios guardados exitosamente');
    });
    cy.on('window.confirm', () => true);

    // Ensure redirection to the dashboard
    cy.url().should('include', 'dashboard');
  });

  it('should show an error if required fields are missing', () => {
    // Clear required fields
    cy.get('input[name="destination_country_name"]').clear();
    cy.get('input[name="destination_city_name"]').clear();
    cy.get('input[name="beginning_date"]').clear();
    cy.get('input[name="beginning_time"]').clear();
    cy.get('input[name="requested_fee"]').clear();
    cy.get('textarea[name="notes"]').clear();

    // Attempt to save the changes *no estoy segura de esto *
    cy.contains('button', 'Actualizar Solicitud').click();

    // Verify error message
    cy.contains('Por favor, completa todos los campos requeridos antes de enviar la solicitud.').should('exist');
  });
});