describe('Actualizar solicitud', () =>{
  beforeEach(() => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder*="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder*="Contraseña"]').type('andres123{enter}');

    cy.on('window:alert', (text)=> {
      expect(text).to.contain('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', ()=> true);

    cy.url().should('include', 'dashboard');
  });

  it('Entrar a la solicitud y actualizarla', () => {
    cy.get('button:enabled').contains('EDITAR').first().click();

    cy.get('input[placeholder*= "Ciudad Origen"]').first().clear().type('Monterrey');
    cy.get('input[placeholder*= "Ciudad Destino"]').first().clear().type('Chicago');

    cy.get('textarea[name=notes').clear().type('Esta solicitud fue modificada por una prueba de Cypress :D');

    cy.contains('Actualizar Solicitud').should('exist').click();
    cy.url().should('eq', 'https://localhost:4321/dashboard')
    })
})