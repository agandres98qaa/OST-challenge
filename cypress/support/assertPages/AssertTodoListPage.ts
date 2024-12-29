class AssertTodoListPage {
  checkItemIsChecked(itemName: string) {
    cy.contains('span', itemName).prev().should('be.checked');
  }

  checkItemIsNotChecked(itemName: string) {
    cy.contains('span', itemName).prev().should('not.be.checked');
  }

  checkItemQuantity(quantity: number) {
    cy.get('ul').children('label').should('have.length', quantity);
  }

  checkItemTopPosition(itemName: string) {
    cy.get('ul')
      .children('label')
      .first()
      .find('span')
      .should('have.text', itemName);
  }

  checkItemBottomPosition(itemName: string) {
    cy.get('ul')
      .children('label')
      .last()
      .find('span')
      .should('have.text', itemName);
  }
}

export default new AssertTodoListPage();
