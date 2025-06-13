import 'cypress-file-upload';
describe('Validación de al subir comprobantes', () => {
  beforeEach(() => {
    cy.login(Cypress.env('SOLICITANTE_USER'), Cypress.env('SOLICITANTE_PASSWORD'));

    cy.get('a[href="/comprobar-gastos"]').click();
    cy.url().should('include', 'comprobar-gastos');
    cy.get('a[href^="/comprobar-solicitud/"]').click();
    cy.get('a[href^="/subir-comprobante/"]').click();  
  });
  
    it('debe aceptar archivos válidos en formato XML y PDF', () => {
      cy.get('select[name="concepto"]').select('Hospedaje');
      cy.get('input[type="number"]').type('123.45');

      cy.get('input[type="file"][accept=".pdf"]')
      .attachFile('valid-document.pdf');
  
      cy.get('input[type="file"][accept=".xml"]')
      .attachFile('valid-document.xml');

      cy.contains('button', 'Subir Comprobante').click();
      cy.contains('button', 'Confirmar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Subidos correctamente');
      });
      cy.on('window.confirm', ()=> true);
    });
  
    it('debe rechazar archivos con formatos inválidos', () => {
      cy.get('select[name="concepto"]').select('Hospedaje');
      cy.get('input[type="number"]').type('123.45');
      
      cy.get('input[type="file"]').attachFile('invalid-document.jpg');
      cy.get('input[type="file"]').attachFile('invalid-document.txt');

      cy.contains('button', 'Subir Comprobante').click();
      cy.contains('button', 'Confirmar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Por favor, completa todos los campos correctamente.');
      });
    });
  });