describe('Eliminar solicitud de viaje', () => {
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

  it('Eliminar solicitud', () =>{
    cy.contains('PRIMERA REVISIÓN').first().parent().within(()=> {
      cy.get('span[class="material-symbols-outlined text-black cursor: pointer"]').should('exist').click({force: true});
    });

    cy.contains('Cancelar Solicitud').should('be.visible');
    cy.contains('¿Estás seguro de que deseas cancelar esta solicitud?').should('be.visible')

    cy.contains('Confirmar').click();

    cy.url().should('eq', 'https://localhost:4321/dashboard')
    });
});