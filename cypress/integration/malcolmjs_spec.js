describe('MalcolmJS', () => {
  it('.should() - load correctly', () => {
    cy.visit('/gui/');
    cy.title().should('equal', 'MalcolmJS DEV');
  });
});
