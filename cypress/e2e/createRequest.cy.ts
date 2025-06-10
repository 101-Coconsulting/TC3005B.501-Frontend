describe('Crear Solicitud', () =>{
  beforeEach(() => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder*="Usuario"]').type('test1')
    cy.get('input[placeholder*="Contraseña"').type('test{enter}')

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', ()=> true);

    cy.url().should('include', 'dashboard');
  });

  it('Acceder a el draft de solicitud', () => {
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