import axios from 'axios';
import type { Task } from '../types/taskTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const createTask = async (task: Task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const getTasks = async (userId: number) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    params: { user_id: userId }
  });
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};


export const updateTaskStatus = async (taskId: number, completed: boolean): Promise<Task> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Agrega Authorization si es necesario
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Failed to update task status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error; // Permite el manejo de errores en el componente
  }
};