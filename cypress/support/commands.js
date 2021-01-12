/* eslint-disable no-undef */
import '@testing-library/cypress/add-commands';
import { testIDs } from '../../src/testIDs';
import { keys } from './keys';

Cypress.Commands.add('getElement', (testID) => {
  return cy.get(`[data-testid=${testID}]`);
});

Cypress.Commands.add(
  'addPointWithEnterKey',
  (pointName, target = testIDs.input) => {
    return pointName
      ? cy.getElement(target).type(pointName).type(keys.enter)
      : cy.getElement(target).type(keys.enter);
  }
);

Cypress.Commands.add('dragAndDrop', (subject, target) => {
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;
  cy.get(target)
    .first()
    .then(($target) => {
      const coordsDrop = $target[0].getBoundingClientRect();
      cy.get(subject)
        .first()
        .then((element) => {
          const coordsDrag = element[0].getBoundingClientRect();
          cy.wrap(element)
            .trigger('mousedown', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x,
              clientY: coordsDrag.y,
              force: true,
            })
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
              clientY: coordsDrag.y,
              force: true,
            });
          cy.get('body')
            .trigger('mousemove', {
              button: BUTTON_INDEX,
              clientX: coordsDrop.x,
              clientY: coordsDrop.y,
              force: true,
            })
            .trigger('mouseup');
        });
    });
});
