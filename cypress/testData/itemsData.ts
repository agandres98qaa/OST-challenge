import { ENV_CONFIG } from '../../config';

export async function getItemsData() {
  const data = await new Cypress.Promise((resolve) => {
    cy.fixture(`items.${ENV_CONFIG.TEST_ENVIRONMENT}.json`).then((f) =>
      resolve(f)
    );
  });
  return data;
}
