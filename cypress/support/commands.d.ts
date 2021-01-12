/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
    */
    getElement(value: string): Chainable<Element>

    addPointWithEnterKey(value: string): Chainable<Element>
  }
}