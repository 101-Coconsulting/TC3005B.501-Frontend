describe('Validación de las Fechas de Viaje (Comprobación/Ida-Regreso) en el proceso de crear solicitud', () => {
  const login = () => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder*="Usuario"]').type(Cypress.env('SOLICITANTE_USER'));
    cy.get('input[placeholder*="Contraseña"]').type(Cypress.env('SOLICITANTE_PASSWORD') + '{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', () => true);

    cy.url().should('include', 'dashboard');
  };

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
    login();
  });

  it('Crear una nueva solicitud incorrectamente sin fechas', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    enviarFormulario();
    cy.contains('Ruta #1: Las fechas de inicio y fin son obligatorias.').should('be.visible');
  });
  it('Crear una nueva solicitud incorrectamente con fecha de regreso anterior a la de salida', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    ingresarFechas('2025-12-12', '09:00', '2025-11-11', '21:00');
    enviarFormulario();
    cy.contains('Ruta #1: La fecha de fin (2025-11-11) debe ser igual o posterior a la fecha de inicio (2025-12-12).').should('be.visible');
  });
  it('Crear una nueva solicitud de forma correcta', () => {
    irACrearSolicitud();
    llenarFormularioSinFechas();
    ingresarFechas('2025-11-11', '09:00', '2025-12-12', '21:00');
    enviarFormulario();
    cy.contains('Solicitud creada y enviada exitosamente.').should('be.visible');

    cy.url().should('include', '/dashboard');
  });
});
