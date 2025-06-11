describe('Document Validation', () => {
    beforeEach(() => {
      // Navigate to the page where the file upload is located
      cy.visit('/comprobar-gastos/1'); // Replace with the actual route
    });
  
    it('should accept valid XML and PDF files', () => {
      // Upload a valid PDF file
      cy.get('input[type="file"]').attachFile('valid-document.pdf');
      cy.contains('Archivo cargado correctamente').should('exist');
  
      // Upload a valid XML file
      cy.get('input[type="file"]').attachFile('valid-document.xml');
      cy.contains('Archivo cargado correctamente').should('exist');
    });
  
    it('should reject invalid file formats', () => {
      // Upload an invalid file (e.g., .jpg)
      cy.get('input[type="file"]').attachFile('invalid-document.jpg');
      cy.contains('Formato de archivo no permitido').should('exist');
  
      // Upload another invalid file (e.g., .txt)
      cy.get('input[type="file"]').attachFile('invalid-document.txt');
      cy.contains('Formato de archivo no permitido').should('exist');
    });
  });