import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://crudapi.co.uk/api/v1/todos';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const toggleTaskCompletion = async (id, isCompleted) => {
    try {
      await axios.put(`${API_URL}/${id}`, { isCompleted });
      setTasks(tasks.map(task => task._id === id ? { ...task, isCompleted } : task));
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <Link to="/add-task">Add New Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTaskCompletion(task._id, !task.isCompleted)}
            />
            <span>{task.name} - {task.deadline} - {task.firstName} {task.lastName} - {task.additionalInfo}</span>
            <Link to={`/edit-task/${task._id}`}>Edit</Link>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
