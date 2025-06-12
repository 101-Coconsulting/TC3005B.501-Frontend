describe('Test de login', () => {
  it('Debería ejecutar el comando login sin errores', () => {
    expect(cy.login).to.exist;
  });
});
