import React from 'react';
import TodoItem from './ToDoItem';

function TodoList({ todos, toggleTodoCompletion, editTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleTodoCompletion={toggleTodoCompletion}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
