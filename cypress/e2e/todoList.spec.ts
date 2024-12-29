import { getItemsData } from '../testData/itemsData';
import TodoListPage from '../support/pages/TodoListPage';
import AssertTodoListPage from '../support/assertPages/AssertTodoListPage';

describe('Toggling Todo Items test suite', () => {
  beforeEach(() => {
    TodoListPage.navigate();
  });
  it('Setting item to uncheked', () => {
    TodoListPage.clickItem('Ace CoderPad interview');
    AssertTodoListPage.checkItemIsNotChecked('Ace CoderPad interview');
  });
  it('Setting item to checked', () => {
    TodoListPage.clickItem('Ace CoderPad interview');
    AssertTodoListPage.checkItemIsNotChecked('Ace CoderPad interview');
    TodoListPage.clickItem('Ace CoderPad interview');
    AssertTodoListPage.checkItemIsChecked('Ace CoderPad interview');
  });
});

describe('Auto-Sinking Checked Items test suite', () => {
  beforeEach(() => {
    TodoListPage.navigate();
  });
  it('Checked item is sent to the bottom', () => {
    TodoListPage.clickItem('Buy groceries');
    AssertTodoListPage.checkItemBottomPosition('Buy groceries');
  });
  it('Unchecked item is removed from the bottom', () => {
    TodoListPage.clickItem('Buy groceries');
    AssertTodoListPage.checkItemBottomPosition('Buy groceries');
    TodoListPage.clickItem('Buy groceries');
    AssertTodoListPage.checkItemBottomPosition('Ace CoderPad interview');
  });
  it('Unchecked item stays at the bottom if there are no more checked items', () => {
    TodoListPage.clickItem('Ace CoderPad interview');
    AssertTodoListPage.checkItemBottomPosition('Ace CoderPad interview');
  });
});

describe('State Persistence test suite', () => {
  let itemData: any;
  before(async () => {
    itemData = await getItemsData();
  });
  beforeEach(() => {
    TodoListPage.navigate();
  });
  it('Adding new items', () => {
    AssertTodoListPage.checkItemQuantity(3);
    TodoListPage.enterItem(itemData.item1.name);
    AssertTodoListPage.checkItemQuantity(4);
    AssertTodoListPage.checkItemTopPosition(itemData.item1.name);
    AssertTodoListPage.checkItemIsNotChecked(itemData.item1.name);
    TodoListPage.enterItem(itemData.item2.name);
    AssertTodoListPage.checkItemQuantity(5);
    AssertTodoListPage.checkItemTopPosition(itemData.item2.name);
    AssertTodoListPage.checkItemIsNotChecked(itemData.item2.name);
  });
  it('Checking new items', () => {
    AssertTodoListPage.checkItemQuantity(3);
    TodoListPage.enterItem(itemData.item1.name);
    AssertTodoListPage.checkItemQuantity(4);
    AssertTodoListPage.checkItemTopPosition(itemData.item1.name);
    TodoListPage.clickItem(itemData.item1.name);
    AssertTodoListPage.checkItemBottomPosition(itemData.item1.name);
  });
  it('Refreshing page and the items persists', () => {
    AssertTodoListPage.checkItemQuantity(3);
    TodoListPage.enterItem(itemData.item1.name);
    AssertTodoListPage.checkItemQuantity(4);
    AssertTodoListPage.checkItemTopPosition(itemData.item1.name);
    TodoListPage.clickItem(itemData.item1.name);
    AssertTodoListPage.checkItemBottomPosition(itemData.item1.name);
    cy.reload();
    AssertTodoListPage.checkItemBottomPosition(itemData.item1.name);
    AssertTodoListPage.checkItemQuantity(4);
  });
  it('Reset todos deletes new items', () => {
    AssertTodoListPage.checkItemQuantity(3);
    TodoListPage.enterItem(itemData.item1.name);
    AssertTodoListPage.checkItemQuantity(4);
    AssertTodoListPage.checkItemTopPosition(itemData.item1.name);
    TodoListPage.enterItem(itemData.item2.name);
    AssertTodoListPage.checkItemQuantity(5);
    AssertTodoListPage.checkItemTopPosition(itemData.item2.name);
    TodoListPage.clickResetTodos();
    AssertTodoListPage.checkItemQuantity(3);
  });
});
