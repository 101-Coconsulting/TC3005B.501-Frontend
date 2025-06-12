describe('Request Details', () => {
  it('should identify id and logout', () => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder="Contraseña"]').type('andres123{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', () => true);

    cy.url().should('include', 'dashboard');

    cy.contains('a[href^="/detalles-solicitud/"]', 'PRIMERA REVISIÓN')
      .parents('div')
      .first()
      .within(() => {
        cy.contains(/^#\d+$/).then(($id) => {
          const idText = $id.text();
          cy.log(`ID encontrado: ${idText}`);
          Cypress.env('solicitudId', idText);
        });
      });

    cy.contains('span.material-symbols-outlined', 'logout').click();
    cy.contains('button', 'Cerrar Sesión').should('be.visible').click();
    cy.url().should('include', '/login');
  });

  it('should navigate to request details', () => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('diego.hernandez');
    cy.get('input[placeholder="Contraseña"]').type('diego654{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', () => true);

    cy.url().should('include', 'dashboard');

    const idText = Cypress.env('solicitudId');
    cy.contains('a[href^="/autorizar-solicitud/"]', idText).click();

    cy.contains('button', 'Aceptar').click();

    cy.contains('button', 'Confirmar').should('be.visible').click();
    cy.contains('span.material-symbols-outlined', 'logout').click();
    cy.contains('button', 'Cerrar Sesión').should('be.visible').click();
    cy.url().should('include', '/login');
  });

  it('should analyze if the request status changed', () => {
    cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder="Contraseña"]').type('andres123{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', () => true);

    cy.url().should('include', 'dashboard');

    const idText = Cypress.env('solicitudId');

    cy.contains(idText)
      .parents('div')
      .first()
      .should('contain.text', 'SEGUNDA REVISIÓN');
  });

});
