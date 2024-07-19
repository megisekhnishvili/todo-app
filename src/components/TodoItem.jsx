import React, { useState } from 'react';

function TodoItem({ todo, toggleTodoCompletion, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(todo.name);

  const handleToggle = () => {
    toggleTodoCompletion(todo._id, !todo.isCompleted);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editTodo(todo._id, name);
    setIsEditing(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleToggle}
      />
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <span>{todo.name}</span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </li>
  );
}

export default TodoItem;

