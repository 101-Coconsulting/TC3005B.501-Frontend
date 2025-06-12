// Custom commands for icon visibility tests

Cypress.Commands.add('login', (username = 'testuser', password = 'testpass') => {
    cy.session([username, password], () => {
      cy.visit('/login');
      
      cy.get('input[type="text"]').clear().type(username);
      cy.get('input[type="password"]').clear().type(password);
      cy.get('button[type="submit"]').click();
      
      // Wait for successful login
      cy.url().should('include', '/dashboard');
    });
  });
  
  Cypress.Commands.add('checkIconVisibility', (selector, iconName) => {
    cy.get(selector)
      .should('be.visible')
      .and('contain', iconName);
  });