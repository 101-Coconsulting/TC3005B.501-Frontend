// Custom commands for icon visibility tests

// Command to set user role via cookies
Cypress.Commands.add('setUserRole', (role = 'Authorizer', username = 'testuser') => {
    cy.setCookie('username', username);
    cy.setCookie('role', role);
  });
  
  // Command to visit dashboard with specific role
  Cypress.Commands.add('visitDashboardAsRole', (role = 'Authorizer') => {
    cy.setUserRole(role);
    cy.visit('/dashboard');
    cy.url().should('include', '/dashboard');
  });
  
  // Enhanced icon visibility checker
  Cypress.Commands.add('checkIconVisibility', (selector, iconName) => {
    cy.get(selector)
      .should('be.visible')
      .and('contain', iconName);
  });
  
  // Command to test different roles easily
  Cypress.Commands.add('testWithRole', (role, testCallback) => {
    cy.setUserRole(role);
    cy.visit('/dashboard');
    testCallback();
  });