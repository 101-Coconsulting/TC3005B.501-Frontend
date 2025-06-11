describe('Document Validation', () => {
    beforeEach(() => {
      // Navigate to the page where the file upload is located
      cy.visit('/comprobar-gastos/1'); // Replace with the actual route
      cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('CPP101');
    cy.get('input[placeholder="Contraseña"').type('789{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', ()=> true);

    cy.url().should('include', 'dashboard'); 

      

    });

    it('should denied the navigation to another page',() =>{

      // cy.visit('/crear-solicitud'); // Replace with the actual route
      cy.request({
        url: '/crear-solicitud',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });

    })
});