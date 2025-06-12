describe('Validación de creación de borrador de solicitud sin enviar', () => {
  beforeEach(() => {
    cy.visit('https://localhost:4321');
    cy.get('input[placeholder*="Usuario"]').type(Cypress.env('SOLICITANTE_USER'));
    cy.get('input[placeholder*="Contraseña"]').type(Cypress.env('SOLICITANTE_PASSWORD') + '{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window:confirm', () => true);

    cy.url().should('include', 'dashboard');
  });

  it('Crear un nuevo borrador de solicitud únicamente con los destinos', () => {
    cy.get('a[href="/crear-solicitud"]').contains('CREAR SOLICITUD').click({ force: true });

    cy.contains('CREAR NUEVA SOLICITUD DE VIAJE').should('be.visible');
    cy.contains('Los campos obligatorios están marcados con un asterisco.').should('be.visible');

    cy.get('input[name="origin_country_name"]').type('México');
    cy.get('input[name="origin_city_name"]').type('Ciudad de México');
    cy.get('input[name="destination_country_name"]').type('Venezuela');
    cy.get('input[name="destination_city_name"]').type('Caracas');
    
    cy.get('button[type="button"]').contains('Guardar Borrador').click();
    cy.contains('Borrador guardado exitosamente').should('be.visible');
  });
  
  it('Comprobar la existencia del borrador con los datos previos y actualizarlo', () => {
    cy.get('a[href="/solicitudes-draft"]').click();
    cy.get('a[href*="/completar-draft/"]').contains('Venezuela').click();
    cy.get('input[name="destination_city_name"]').clear().type('Maracaibo');
    cy.get('button[type="button"]').contains('Guardar Cambios').click();
    cy.contains('Cambios guardados exitosamente.').should('be.visible');
  });

  it('Eliminar el borrador creado', () => {
    cy.get('a[href="/solicitudes-draft"]').click()
    cy.contains('Venezuela').first().parent().within(()=> {
      cy.get('span[class="material-symbols-outlined text-black cursor: pointer"]').should('exist').click({force: true});
    });
    cy.contains('Cancelar Solicitud').should('be.visible');
    cy.contains('¿Estás seguro de que deseas cancelar esta solicitud?').should('be.visible')
    cy.contains('Confirmar').click();
  });
});
