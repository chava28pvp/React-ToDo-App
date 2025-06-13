import { useState } from 'react';
import { Container } from 'react-bootstrap';
import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(prev => !prev);
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Add New Task</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={refresh.toString()} />
    </Container>
  );
};

export default Home;