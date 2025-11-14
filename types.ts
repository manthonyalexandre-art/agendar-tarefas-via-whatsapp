
export interface Task {
  id: string;
  name: string;
  date: string;
  time: string;
  description?: string;
  completed: boolean;
  notificationSent: boolean;
}
