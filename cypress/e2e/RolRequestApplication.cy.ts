describe('Verificación de viaje con destino Bolivia para dos usuarios', () => {
    it('test y test5 deben ver solicitudes con destino Bolivia', () => {
      // --- Login como "test"
      cy.visit('https://localhost:4321/login');
      cy.get('input#username').type('test');
      cy.get('input#password').type('test');
      cy.get('form').submit();
  
      cy.url().should('include', '/dashboard');
  
      // Verifica "País Destino: Bolivia"
      cy.contains('p', 'País Destino: Bolivia').should('exist');
  
      // --- Simula logout visitando manualmente /login
      cy.visit('https://localhost:4321/login');
  
      // --- Login como "test5"
      cy.get('input#username').clear().type('test4');
      cy.get('input#password').clear().type('test');
      cy.get('form').submit();
  
      cy.url().should('include', '/dashboard');
    
      // Verifica que aparece el texto "Viaje Rumbo a Bolivia"
      cy.contains('Viaje Rumbo a Bolivia').should('exist');
    });
  });
  