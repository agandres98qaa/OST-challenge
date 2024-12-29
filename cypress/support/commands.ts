Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add('apiLogin', (email, password) => {
  email = typeof email !== 'undefined' ? email : Cypress.env('adminEmail');
  password =
    typeof password !== 'undefined' ? password : Cypress.env('adminPassword');
  return cy.request({
    method: 'POST',
    url: '/authentication/login',
    body: {
      email: email,
      password: password,
    },
  });
});

Cypress.Commands.add('getByNameAttr', (name) => {
  return cy.get(`[name="${name}"]`);
});

Cypress.Commands.add('getByTestId', (id) => {
  return cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add('setDropdown', (dropdownButtonSelector, value) => {
  const dropdownButton = cy.getByNameAttr(dropdownButtonSelector);
  dropdownButton.click();
  cy.contains('li', value).click();
  dropdownButton.then((el) => {
    expect(el.text()).to.be.eq(value);
  });
});

Cypress.Commands.add('setDropdownByValue', (dropdownButtonSelector, value) => {
  const dropdownButton = cy.getByNameAttr(dropdownButtonSelector);
  dropdownButton.click();
  cy.contains('li', value).click();
  cy.getByNameAttr(dropdownButtonSelector).invoke('val').should('equal', value);
});

Cypress.Commands.add('setToggleOn', (toggleNameAttr: string) => {
  cy.getByNameAttr(toggleNameAttr)
    .first()
    .then(($el) => {
      cy.wrap($el)
        .parent('label')
        .click()
        .find('span')
        .invoke('css', 'background-color')
        .should('eq', 'rgb(47, 189, 176)');
    });
});

Cypress.Commands.add(
  'setDropdownValue',
  (dropdownNameAttr: string, value: string) => {
    return cy
      .getByNameAttr(dropdownNameAttr)
      .eq(1)
      .should('be.enabled')
      .then(($el) => {
        cy.wrap($el).click();
        cy.get(`li[data-value="${value}"]`).click();
      });
  }
);

Cypress.Commands.add('waitForSeconds', (seconds) => {
  cy.log(`**waitFor ${seconds} Seconds**`);
  cy.wait(seconds * 1000);
});

Cypress.Commands.add('getLinkFromClipboardAndGoToPage', () => {
  // Get the link from the clipboard

  if (Cypress.browser.name === 'chrome') {
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    );
  }

  return cy.window().then((win) => {
    return win.navigator.clipboard.readText().then((page) => {
      cy.visit(page);
    });
  });
});

Cypress.Commands.add('getValueFromClipboard', () => {
  // Get the link from the clipboard
  cy.log('***getValueFromClipboard***');

  if (Cypress.browser.name === 'chrome') {
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    );
  }

  cy.window().then((win) => {
    return win.navigator.clipboard.readText().then((page) => {
      cy.wait(1000);
      return cy.task('setValueFromClipboard', page);
    });
  });
});

Cypress.Commands.add('checkDecimalNumber', (value: number) => {
  cy.log('***checkDecimalNumber***: ' + value);
  expect(Number.isFinite(value) && !Number.isInteger(value)).to.be.true;
});
