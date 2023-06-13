import { createSignal, Show, For, createMemo } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

let counter = 0;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

const App = () => {
  const [todos, setTodos] = createSignal([]);
  const remainingCount = createMemo(
    () => todos().length - todos().filter((todo) => todo.completed).length
  );

  const addTodo = (event) => {
    const title = event.target.value.trim();
    if (event.keyCode === ENTER_KEY && title) {
      setTodos((todos) => [
        ...todos,
        { id: counter++, title, completed: false },
      ]);
      event.target.value = '';
    }
  };

  const toggle = (todoId) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id !== todoId) return todo;
        return { ...todo, completed: !todo.completed };
      })
    );
  };

  const remove = (todoId) => {
    setTodos((todos) => todos.filter((todo) => todoId !== todo.id));
  };

  const toggleAll = (event) => {
    const completed = event.target.checked;
    setTodos((todos) => todos.map((todo) => ({ ...todo, completed })));
  };

  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={addTodo}
        />
      </header>
      <Show when={todos().length > 0}>
        <section class="main">
          <input
            class="toggle-all"
            id="toggle-all"
            type="checkbox"
            onInput={toggleAll}
            checked={!remainingCount()}
          />
          <label for="toggle-all" />
          <ul class="todo-list">
            <For each={todos()}>
              {(todo) => (
                <li class="todo" classList={{ completed: todo.completed }}>
                  <div class="view">
                    <input
                      type="checkbox"
                      class="toggle"
                      checked={todo.completed}
                      onInput={() => toggle(todo.id)}
                    />
                    <label> {todo.title} </label>
                    <button
                      class="destroy"
                      onClick={() => remove(todo.id)}
                    ></button>
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
      </Show>
    </section>
  );
};

export default App;
