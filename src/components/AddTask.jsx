import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://crudapi.co.uk/api/v1/todos';

function AddTask() {
  const [task, setTask] = useState({
    name: '',
    deadline: '',
    firstName: '',
    lastName: '',
    additionalInfo: '',
    isCompleted: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, task);
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Task Name"
        required
      />
      <input
        type="text"
        name="deadline"
        value={task.deadline}
        onChange={handleChange}
        placeholder="Deadline"
      />
      <input
        type="text"
        name="firstName"
        value={task.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={task.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="text"
        name="additionalInfo"
        value={task.additionalInfo}
        onChange={handleChange}
        placeholder="Additional Info"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
