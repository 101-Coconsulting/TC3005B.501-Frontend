describe('Request Details', () => {
    beforeEach(() => {
      // Navigate to the page where the file upload is located
      
      cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder="Contraseña"').type('andres123{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', ()=> true);

    cy.url().should('include', 'dashboard'); 



    });

    it('should enter to the request detail',() =>{

      cy.get('a[href^="/detalles-solicitud/"]').first().click();
      cy.contains( 'Detalles del Usuario');
      cy.contains( 'Tarifas y Fechas');
      cy.url().should('include', '/detalles-solicitud/');

    })
});