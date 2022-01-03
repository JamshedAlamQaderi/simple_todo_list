export default interface ITodoItemModel {
  todoItemId: number;
  todoText: string;
  priority: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
