import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createTask } from '../../services/taskService';
import type { Task } from '../../types/taskTypes';

const TaskForm = ({ onTaskAdded }: { onTaskAdded: () => void }) => {
  const [task, setTask] = useState<Omit<Task, 'user_id'>>({
    description: '',
    due_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    await createTask({
      ...task,
      user_id: parseInt(userId)
    });
    onTaskAdded();
    setTask({
      description: '',
      due_date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="due_date"
          value={task.due_date}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;