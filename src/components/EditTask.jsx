import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://crudapi.co.uk/api/v1/todos';

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    name: '',
    deadline: '',
    firstName: '',
    lastName: '',
    additionalInfo: '',
    isCompleted: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${id}`, task);
      navigate('/');
    } catch (error) {
      console.error('Error editing task:', error);
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTask;
