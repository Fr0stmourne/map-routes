import { testIDs } from '../../src/testIDs';

const itemSelector = `[data-testid=${testIDs.item}]`;

const nthItemIncludesText = (n: number, text: string) => {
  cy.get(`${itemSelector}:nth-child(${n})`).should(($el) => {
    const elementText = $el.text();

    expect(elementText).to.match(new RegExp(text, 'g'));
  });
};

describe('DnD', () => {
  it('should correctly reorder items in the list', () => {
    cy.visit('/')
      .addPointWithEnterKey('Park')
      .addPointWithEnterKey('Shop')
      .addPointWithEnterKey('Square')

      .dragAndDrop(
        `${itemSelector}:nth-child(1)`,
        `${itemSelector}:nth-child(3)`
      );

    nthItemIncludesText(1, 'Shop');
    nthItemIncludesText(2, 'Square');
    nthItemIncludesText(3, 'Park');
  });
});
