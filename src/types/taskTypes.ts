export interface Task {
  id?: number;
  description: string;
  due_date: string;
  user_id: number;
  completed?: boolean;
}

export type TaskStatus = 'all' | 'completed' | 'pending';