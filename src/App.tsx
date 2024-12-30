import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import { AddInput } from './components/AddInput';
import { TodoItem } from './components/TodoItem';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Todo } from './interface';
import { ResetButton } from './components/ResetButton';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
});

const LOCAL_STORAGE_KEY = 'todos';

const initialData: Todo[] = [
  {
    id: uuid(),
    label: 'Buy groceries',
    checked: false,
  },
  {
    id: uuid(),
    label: 'Reboot computer',
    checked: false,
  },
  {
    id: uuid(),
    label: 'Ace CoderPad interview',
    checked: true,
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
      },
      ...prev,
    ]);
  }, []);

  const handleChange = useCallback((id: string, checked: boolean) => {
    setTodos((prev) => {
      if (checked) {
        const targetTodo = prev.find((todo) => todo.id === id);
        if (!targetTodo) return prev;

        const updatedTodo = { ...targetTodo, checked };
        const filteredTodos = prev.filter((todo) => todo.id !== id);

        if (updatedTodo.checked) {
          return [...filteredTodos, updatedTodo];
        } else {
          return [updatedTodo, ...filteredTodos];
        }
      } else {
        const updatedTodos = prev.map((todo) =>
          todo.id === id ? { ...todo, checked } : todo
        );
        return updatedTodos.sort(
          (a, b) => Number(a.checked) - Number(b.checked)
        );
      }
    });
  }, []);

  const resetTodos = useCallback(() => {
    setTodos(initialData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  }, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onChange={(checked) => handleChange(todo.id, checked)}
          />
        ))}
      </TodoList>
      <ResetButton onReset={resetTodos} />
    </Wrapper>
  );
}

export default App;
