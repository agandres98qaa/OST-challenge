import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getItemsData } from './testData/itemsData';
import App from './App';

describe('Toggling Todo Items test suite', () => {
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  it('Setting item to unchecked', async () => {
    const todoItemCheckbox = screen.getByRole('checkbox', {
      name: /Ace CoderPad interview/i,
    });
    await userEvent.click(todoItemCheckbox);

    expect(todoItemCheckbox).not.toBeChecked();
  });

  it('Setting item to checked', async () => {
    const todoItemCheckbox = screen.getByRole('checkbox', {
      name: /Buy groceries/i,
    });

    await userEvent.click(todoItemCheckbox);

    expect(todoItemCheckbox).toBeChecked();
  });
});
describe('Auto-Sinking Checked Items test suite', () => {
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  it('Checked item is sent to the bottom', async () => {
    const todoItemCheckbox = screen.getByRole('checkbox', {
      name: /Buy groceries/i,
    });
    await userEvent.click(todoItemCheckbox);

    expect(todoItemCheckbox).toBeChecked();

    const listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckbox);
  });

  it('Unchecked item is removed from the bottom', async () => {
    const todoItemCheckbox = screen.getByRole('checkbox', {
      name: /Buy groceries/i,
    });

    await userEvent.click(todoItemCheckbox);

    expect(todoItemCheckbox).toBeChecked();

    let listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckbox);

    await userEvent.click(todoItemCheckbox);

    const todoItemCheckboxNewBottom = screen.getByRole('checkbox', {
      name: /Ace CoderPad interview/i,
    });

    listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckboxNewBottom);
  });

  it('Unchecked item is removed from the bottom', async () => {
    const todoItemCheckbox = screen.getByRole('checkbox', {
      name: /Ace CoderPad interview/i,
    });
    await userEvent.click(todoItemCheckbox);

    let listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckbox);
  });
});
describe('State Persistence test suite', () => {
  let itemData: any;
  beforeAll(async () => {
    itemData = await getItemsData();
  });
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  it('Adding new items', async () => {
    let listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(3);
    const input = screen.getByPlaceholderText(/Add a new todo item here/i);
    await userEvent.type(input, `${itemData.item1.name}{enter}`);

    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(4);
    let todoItemCheckbox = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    expect(todoItemCheckbox).not.toBeChecked();
    expect(listItems[0]).toBe(todoItemCheckbox);

    await userEvent.type(input, `${itemData.item2.name}{enter}`);

    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(5);
    todoItemCheckbox = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item2.name, 'i'),
    });
    expect(todoItemCheckbox).not.toBeChecked();
    expect(listItems[0]).toBe(todoItemCheckbox);
  });
  it('Checking new items', async () => {
    let listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(3);
    const input = screen.getByPlaceholderText(/Add a new todo item here/i);
    await userEvent.type(input, `${itemData.item1.name}{enter}`);
    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(4);
    let todoItemCheckbox = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    expect(listItems[0]).toBe(todoItemCheckbox);

    await userEvent.click(todoItemCheckbox);
    const todoItemCheckboxNewBottom = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });

    listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckboxNewBottom);
  });
  it('Refreshing page and the items persists', async () => {
    let listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(3);
    const input = screen.getByPlaceholderText(/Add a new todo item here/i);
    await userEvent.type(input, `${itemData.item1.name}{enter}`);
    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(4);
    let todoItemCheckbox = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    expect(listItems[0]).toBe(todoItemCheckbox);

    await userEvent.click(todoItemCheckbox);
    let todoItemCheckboxNewBottom = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });

    listItems = screen.getAllByRole('checkbox');

    expect(listItems[listItems.length - 1]).toBe(todoItemCheckboxNewBottom);
    cleanup();
    render(<App />);

    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(4);
    todoItemCheckboxNewBottom = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    expect(listItems[listItems.length - 1]).toBe(todoItemCheckboxNewBottom);
  });
  it('Reset todos deletes new items', async () => {
    let listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(3);
    const input = screen.getByPlaceholderText(/Add a new todo item here/i);
    await userEvent.type(input, `${itemData.item1.name}{enter}`);
    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(4);
    let todoItemCheckbox = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    expect(listItems[0]).toBe(todoItemCheckbox);

    await userEvent.click(todoItemCheckbox);
    let todoItemCheckboxNewBottom = screen.getByRole('checkbox', {
      name: new RegExp(itemData.item1.name, 'i'),
    });
    listItems = screen.getAllByRole('checkbox');
    expect(listItems[listItems.length - 1]).toBe(todoItemCheckboxNewBottom);

    let resetButton = screen.getByRole('button');
    await userEvent.click(resetButton);
    listItems = screen.getAllByRole('checkbox');
    expect(listItems.length).toBe(3);
  });
});
