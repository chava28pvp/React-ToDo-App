import { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { getTasks, deleteTask, updateTaskStatus } from '../../services/taskService';
import type { Task, TaskStatus } from '../../types/taskTypes';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus>('all');
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(parseInt(userId!));
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (taskId: number, completed: boolean) => {
  try {
    // Actualización optimista
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed } : task
    ));

    await updateTaskStatus(taskId, completed);
    
    // Si prefieres datos frescos del servidor:
    // await fetchTasks();
  } catch (error) {
    // Revertir en caso de error
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, completed: !completed } : task
    ));
    
    // Mostrar error al usuario (puedes usar un toast/alert mejor)
    console.error('Update failed:', error instanceof Error ? error.message : error);
  }
};

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Tasks</h2>
        <ButtonGroup>
          <Button
            variant={filter === 'all' ? 'primary' : 'outline-primary'}
            onClick={() => setFilter('all')}
          >
            All <Badge bg="secondary">{tasks.length}</Badge>
          </Button>
          <Button
            variant={filter === 'completed' ? 'success' : 'outline-success'}
            onClick={() => setFilter('completed')}
          >
            Completed <Badge bg="secondary">{tasks.filter(t => t.completed).length}</Badge>
          </Button>
          <Button
            variant={filter === 'pending' ? 'warning' : 'outline-warning'}
            onClick={() => setFilter('pending')}
          >
            Pending <Badge bg="secondary">{tasks.filter(t => !t.completed).length}</Badge>
          </Button>
        </ButtonGroup>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No tasks found
              </td>
            </tr>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;