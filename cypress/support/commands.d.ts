/// <reference types="cypress" />

type GetFunction = typeof cy.get;
type GetArgument = GetFunction extends (
  selector: infer T,
  ...args: any[]
) => any
  ? T
  : never;
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    getElement(value: string): Chainable<Element>;

    addPointWithEnterKey(value: string): Chainable<Element>;

    dragAndDrop(subject: GetArgument, target: GetArgument): Chainable<Element>;
  }
}
