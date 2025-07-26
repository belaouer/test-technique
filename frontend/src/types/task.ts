export interface Task {
  id: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  dueDate: string;
  completed: boolean;
  listId: string;
  createdAt: string;
  updatedAt: string;
}
