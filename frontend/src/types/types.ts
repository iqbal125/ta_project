export interface Todo {
  id: string;
  title: string;
  description: string;
}

export type TodoCreate = Omit<Todo, 'id'>;
