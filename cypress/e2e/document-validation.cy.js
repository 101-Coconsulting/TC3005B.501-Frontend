import 'cypress-file-upload';
describe('Document Validation', () => {
    beforeEach(() => {
      // Navigate to the page where the file upload is located
      cy.visit('https://localhost:4321');

    cy.get('input[placeholder="Usuario"]').type('andres.gomez');
    cy.get('input[placeholder="Contraseña"').type('andres123{enter}');

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Inicio de sesión exitoso');
    });
    cy.on('window.confirm', ()=> true);

    cy.url().should('include', 'dashboard'); 

    cy.get('a[href="/comprobar-gastos"]').click();

    cy.url().should('include', 'comprobar-gastos');

    cy.get('a[href^="/comprobar-solicitud/"]').click();
    cy.get('a[href^="/subir-comprobante/"]').click();  

    });
  
    it('should accept valid XML and PDF files', () => {

      
      cy.get('select[name="concepto"]').select('Hospedaje');
      cy.get('input[type="number"]').type('123.45');
      // Subir archivo PDF
      cy.get('input[type="file"][accept=".pdf"]')
      .attachFile('valid-document.pdf');
  
      // Upload a valid XML file
      cy.get('input[type="file"][accept=".xml"]')
      .attachFile('valid-document.xml');

      cy.contains('button', 'Subir Comprobante').click();
      cy.contains('button', 'Confirmar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Subidos correctamente');
      });
      cy.on('window.confirm', ()=> true);
      




    });
  
    it('should reject invalid file formats', () => {

      cy.get('select[name="concepto"]').select('Hospedaje');
      cy.get('input[type="number"]').type('123.45');
      // Upload an invalid file (e.g., .jpg)
      cy.get('input[type="file"]').attachFile('invalid-document.jpg');
  
      // Upload another invalid file (e.g., .txt)
      cy.get('input[type="file"]').attachFile('invalid-document.txt');

      cy.contains('button', 'Subir Comprobante').click();
      cy.contains('button', 'Confirmar').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Por favor, completa todos los campos correctamente.');
      });
    });
  });