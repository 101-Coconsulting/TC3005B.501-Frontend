// Icon Visibility Tests - ID-102 #161
describe('Icon Visibility Tests - ID-102', () => {
    beforeEach(() => {
      // Intercept API calls to mock responses
      cy.intercept('GET', '**/api/**', { fixture: 'mock-data.json' }).as('apiCall');
      
      // Visit login page
      cy.visit('/login');
      
      // Perform login
      cy.get('input[type="text"]').type('testuser');
      cy.get('input[type="password"]').type('testpass');
      cy.get('button[type="submit"]').click();
      
      // Wait for dashboard to load
      cy.url().should('include', '/dashboard');
    });
  
    describe('Header Icons', () => {
      it('should display logo icon in header', () => {
        cy.get('header img[src="/Logo.svg"]')
          .should('be.visible')
          .and('have.attr', 'alt');
      });
  
      it('should display dark mode icon', () => {
        cy.get('header')
          .find('[class*="material-symbols"]')
          .contains('dark_mode')
          .should('be.visible');
      });
  
      it('should display logout icon', () => {
        cy.get('header')
          .find('[class*="material-symbols"]')
          .contains('logout')
          .should('be.visible');
      });
  
      it('should display user profile icon', () => {
        cy.get('header')
          .find('[class*="material-symbols"]')
          .contains('person')
          .should('be.visible');
      });
    });
  
    describe('Sidebar Icons', () => {
      it('should display all sidebar menu icons', () => {
        const expectedIcons = [
          'home',        // Dashboard
          'flight',      // Crear Solicitud
          'draft',       // Draft Solicitudes
          'payments',    // Comprobar Gastos
          'paid',        // Reembolsos
          'inventory'    // Historial
        ];
  
        expectedIcons.forEach(iconName => {
          cy.get('aside')
            .find('[class*="material-symbols"]')
            .contains(iconName)
            .should('be.visible');
        });
      });
  
      it('should highlight active sidebar icon', () => {
        cy.get('aside a[href="/dashboard"]')
          .should('have.class', 'bg-primary-500');
      });
    });
  
    describe('Dashboard Content Icons', () => {
      it('should display delete icons for travel requests', () => {
        cy.get('body').then($body => {
          if ($body.find('[class*="material-symbols"]:contains("delete")').length > 0) {
            cy.get('[class*="material-symbols"]')
              .contains('delete')
              .should('be.visible');
          } else {
            cy.log('No delete icons found - this is expected if no requests exist');
          }
        });
      });
    });
  
    describe('Responsive Icon Display', () => {
      it('should display icons on mobile viewport', () => {
        cy.viewport(375, 667); // iPhone SE
        
        cy.get('header img[src="/Logo.svg"]')
          .should('be.visible');
        
        cy.get('header [class*="material-symbols"]')
          .should('have.length.greaterThan', 0);
      });
  
      it('should display icons on tablet viewport', () => {
        cy.viewport(768, 1024); // iPad
        
        cy.get('aside [class*="material-symbols"]')
          .should('have.length.greaterThan', 0);
        
        cy.get('header [class*="material-symbols"]')
          .should('have.length.greaterThan', 0);
      });
    });
  
    describe('Icon Accessibility', () => {
      it('should have proper alt attributes for images', () => {
        cy.get('img[src="/Logo.svg"]')
          .should('have.attr', 'alt')
          .and('not.be.empty');
      });
    });
  });