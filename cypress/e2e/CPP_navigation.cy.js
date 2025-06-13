describe('Document Validation', () => {
    beforeEach(() => {
      
    cy.visit('https://localhost:4321');


    });

    it('should denied the navigation to another page',() =>{
      cy.get('input[placeholder="Usuario"]').type('carlos.ramos');
      cy.get('input[placeholder="Contraseña"').type('carlos789{enter}');

      cy.on('window:alert', (text) => {
        expect(text).to.contains('Inicio de sesión exitoso');
      });
      cy.on('window.confirm', ()=> true);

      cy.url().should('include', 'dashboard');
      // cy.visit('/crear-solicitud'); // Replace with the actual route
      cy.request({
        url: '/crear-solicitud',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });

    })

    it('should denied the navigation to another page without login',() =>{
      
      
      cy.request({
        url: '/crear-solicitud',
        failOnStatusCode: false,
      });

      cy.url().should('include', '/login');

    })
});