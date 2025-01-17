import { testIDs } from '../../src/testIDs';

describe('addPoints', () => {
  // Arrange - Act - Assert separation
  it('should correctly append new items to the list', () => {
    cy.visit('/')

      .addPointWithEnterKey('Park')
      .addPointWithEnterKey('Museum')
      .addPointWithEnterKey('Shop')

      .getElement(testIDs.list)
      .children()
      .should('have.length', 3);
  });

  it('should not append new item if no name is passed', () => {
    cy.visit('/')

      .addPointWithEnterKey('')

      .getElement(testIDs.list)
      .children()
      .should('have.length', 0);
  });
});
