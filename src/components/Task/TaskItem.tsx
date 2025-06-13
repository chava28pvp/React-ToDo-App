import { Button, Badge } from 'react-bootstrap';
import type { Task } from '../../types/taskTypes';

const TaskItem = ({
  task,
  onDelete,
  onStatusChange
}: {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, completed: boolean) => void;
}) => {
  const formattedDate = new Date(task.due_date).toLocaleDateString();

  return (
    <tr>
      <td>{task.description}</td>
      <td>{formattedDate}</td>
      <td>
        <Badge bg={task.completed ? 'success' : 'warning'}>
          {task.completed ? 'Completed' : 'Pending'}
        </Badge>
      </td>
      <td>
        <Button
          variant={task.completed ? 'warning' : 'success'}
          size="sm"
          className="me-2"
          onClick={() => onStatusChange(task.id!, !task.completed)}
        >
          {task.completed ? 'Mark Pending' : 'Mark Completed'}
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task.id!)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TaskItem;