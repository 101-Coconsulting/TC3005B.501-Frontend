describe('Validación de fechas en la creación de solicitudes de viaje', () => {
  const irACrearSolicitud = () => {
    cy.get('a[href="/crear-solicitud"]').contains('CREAR SOLICITUD').click({ force: true });
    cy.contains('CREAR NUEVA SOLICITUD DE VIAJE').should('be.visible');
    cy.contains('Los campos obligatorios están marcados con un asterisco.').should('be.visible');
  };

  const llenarFormularioSinFechas = () => {
    cy.get('input[name="origin_country_name"]').type('México');
    cy.get('input[name="origin_city_name"]').type('Ciudad de México');
    cy.get('input[name="destination_country_name"]').type('España');
    cy.get('input[name="destination_city_name"]').type('Vigo');

    cy.get('input[name="hotel_needed"]').check().should('be.checked');
    cy.get('input[name="requested_fee"]').type('2000');
    cy.get('textarea[name="notes"]').type('Es necesario que el sitio quedé al lado del estadio del Celta');
  };

  const enviarFormulario = () => {
    cy.get('button[type="button"]').contains('Enviar Solicitud').click();
  };

  const ingresarFechas = (inicio: string, horaInicio: string, fin: string, horaFin: string) => {
    cy.get('input[name="beginning_date"]').clear().type(inicio);
    cy.get('input[name="beginning_time"]').clear().type(horaInicio);
    cy.get('input[name="ending_date"]').clear().type(fin);
    cy.get('input[name="ending_time"]').clear().type(horaFin);
  };

  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));
  });
  
  afterEach(() => {
    cy.logout();
  });

  it('debe mostrar error si no se ingresan fechas de viaje', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    enviarFormulario();
    cy.contains('Ruta #1: Las fechas de inicio y fin son obligatorias.').should('be.visible');
  });
  it('debe mostrar error si la fecha de regreso es anterior a la fecha de salida', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    ingresarFechas('2025-12-12', '09:00', '2025-11-11', '21:00');
    enviarFormulario();
    cy.contains('Ruta #1: La fecha de fin (2025-11-11) debe ser igual o posterior a la fecha de inicio (2025-12-12).').should('be.visible');
  });
  it('debe permitir crear correctamente una solicitud con fechas válidas', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    ingresarFechas('2025-11-11', '09:00', '2025-12-12', '21:00');
    enviarFormulario();
    cy.contains('Solicitud creada y enviada exitosamente.').should('be.visible');

    cy.url().should('include', '/dashboard');
  });
});
