describe('Login básico con usuario test', () => {
    it('Inicia sesión con el usuario test', () => {
      // Visitar la página de login
      cy.visit('https://localhost:4321/login');
  
      // Ingresar el usuario
      cy.get('input#username').type('test');
  
      // Ingresar la contraseña
      cy.get('input#password').type('test');
  
      // Enviar el formulario
      cy.get('form').submit();
  
      // Opcional: esperar redirección al dashboard o verificar algo
      cy.url().should('include', '/dashboard'); // solo si aplica
    });
  });
  