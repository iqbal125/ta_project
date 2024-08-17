import React from 'react';
import TodoList from '../components/TodoList';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTodos } from '@/api/todo';

const TodoListPage: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetchAllTodos()
  });

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-100">
      <h1 className="text-2xl font-bold mt-8">Todos:</h1>
      {isLoading && <div>...Loading</div>}
      {!isLoading && data?.length === 0 && <div>None Found</div>}
      {error && <div>{error.message} </div>}
      {data && <TodoList todos={data} />}
    </div>
  );
};

export default TodoListPage;
