describe('Gestión de borradores de solicitudes de viaje', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });

  afterEach(() => {
    cy.logout();
  });

  it('debe permitir guardar un nuevo borrador con solo los datos de destino', () => {
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
  
  it('debe permitir editar un borrador existente y guardar los cambios', () => {
    cy.get('a[href="/solicitudes-draft"]').click();
    cy.get('a[href*="/completar-draft/"]').contains('Venezuela').click();
    cy.get('input[name="destination_city_name"]').clear().type('Maracaibo');
    cy.get('button[type="button"]').contains('Guardar Cambios').click();
    cy.contains('Cambios guardados exitosamente.').should('be.visible');
  });

  it('debe permitir eliminar un borrador existente', () => {
    cy.get('a[href="/solicitudes-draft"]').click()
    cy.contains('Venezuela').first().parent().within(()=> {
      cy.get('span[class="material-symbols-outlined text-black cursor: pointer"]').should('exist').click({force: true});
    });
    cy.contains('Cancelar Solicitud').should('be.visible');
    cy.contains('¿Estás seguro de que deseas cancelar esta solicitud?').should('be.visible')
    cy.contains('Confirmar').click();
  });
});
