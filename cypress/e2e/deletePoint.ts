import { testIDs } from '../../src/testIDs';

describe('deletePoint', () => {
  it('should correctly append new items to the list', () => {
    cy.visit('/')
      .addPointWithEnterKey('Park')

      .getElement(testIDs.delete)
      .first()
      .click()

      .getElement(testIDs.list)
      .children()
      .should('have.length', 0);
  });
});
