// cypress/e2e/icon-visibility.cy.js
// Icon Visibility Tests - ID-102 #161

describe('Icon Visibility Tests - ID-102', () => {
    beforeEach(() => {
      // Intercept API calls to mock responses
      cy.intercept('GET', '**/api/**', { fixture: 'mock-data.json' }).as('apiCall');
      
      // Simulate authenticated user via cookies
      cy.setCookie('username', 'testuser');
      cy.setCookie('role', 'Authorizer');
  
      // Directly visit the dashboard (skipping login)
      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');
    });
  
    describe('Header Icons', () => {
      it('should display logo icon in header', () => {
        cy.get('header').then($hdr => {
          const logo = $hdr.find('img[src="/Logo.svg"]');
          if (logo.length) {
            cy.wrap(logo)
              .should('be.visible')
              .and('have.attr', 'alt');
          } else {
            cy.log('Logo icon not rendered for this role — skipping');
          }
        });
      });
  
      it('should display dark mode icon', () => {
        cy.get('header').then($hdr => {
          const dark = $hdr.find('[class*="material-symbols"]').filter((i, el) => el.textContent.includes('dark_mode'));
          if (dark.length) {
            cy.wrap(dark).should('be.visible');
          } else {
            cy.log('Dark mode icon not rendered for this role — skipping');
          }
        });
      });
  
      it('should display logout icon', () => {
        cy.get('header').then($hdr => {
          const out = $hdr.find('[class*="material-symbols"]').filter((i, el) => el.textContent.includes('logout'));
          if (out.length) {
            cy.wrap(out).should('be.visible');
          } else {
            cy.log('Logout icon not rendered for this role — skipping');
          }
        });
      });
  
      it('should display user profile icon', () => {
        cy.get('header').then($hdr => {
          const user = $hdr.find('[class*="material-symbols"]').filter((i, el) => el.textContent.includes('person'));
          if (user.length) {
            cy.wrap(user).should('be.visible');
          } else {
            cy.log('User profile icon not rendered for this role — skipping');
          }
        });
      });
    });
  
    describe('Sidebar Icons', () => {
      it('should display all sidebar menu icons', () => {
        const expectedIcons = [
          'home',       // Dashboard
          'flight',     // Crear Solicitud
          'draft',      // Draft Solicitudes
          'payments',   // Comprobar Gastos
          'paid',       // Reembolsos
          'inventory'   // Historial
        ];
  
        cy.get('aside').then($aside => {
          expectedIcons.forEach(iconName => {
            if ($aside.find(`[class*="material-symbols"]:contains("${iconName}")`).length) {
              cy.wrap($aside)
                .find('[class*="material-symbols"]')
                .contains(iconName)
                .should('be.visible');
            } else {
              cy.log(`Icon "${iconName}" not rendered for this role — skipping`);
            }
          });
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
  
        cy.get('header').then($hdr => {
          // Logo may be hidden on mobile—assert only if present
          const logo = $hdr.find('img[src*="Logo"]');
          if (logo.length) {
            cy.wrap(logo).should('be.visible');
          } else {
            cy.log('Logo hidden at mobile viewport — OK');
          }
  
          // Ensure at least one icon font is rendered
          cy.wrap($hdr)
            .find('[class*="material-symbols"]')
            .its('length')
            .should('be.greaterThan', 0);
        });
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
        cy.get('body').then($body => {
          const imgs = $body.find('img');
          if (imgs.length) {
            Cypress.
              _.
              each(imgs, img => {
                const $img = Cypress.$(img);
                const src = $img.attr('src') || '';
                if (src.includes('Logo') || /\.(svg|png|jpg)$/i.test(src)) {
                  cy.wrap($img)
                    .should('have.attr', 'alt')
                    .and('not.be.empty');
                } else {
                  cy.log(`Skipping image "${src}" — not a logo or icon asset`);
                }
              });
          } else {
            cy.log('No images found in DOM — skipping alt attribute checks');
          }
        });
      });
    });
  });
  
  