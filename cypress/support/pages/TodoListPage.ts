class TodoListPage {
  private itemInput = "input[placeholder='Add a new todo item here']";
  private passwordInput = '#pass';
  private loginButton = '#send2';
  public url = '';

  navigate() {
    cy.visit(this.url);
  }

  enterItem(item: string) {
    cy.get(this.itemInput).clear().type(`${item}{enter}`);
  }

  clickItem(itemName: string) {
    cy.contains('span', itemName).click();
  }

  clickResetTodos() {
    cy.contains('button', 'Reset Todos').click();
  }
}

export default new TodoListPage();
