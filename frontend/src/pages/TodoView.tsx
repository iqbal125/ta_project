import React from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { fetchOneTodo } from '@/api/todo';

const TodoViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Fetch the id from the URL params
  if (!id) throw 'id not found';

  const { isLoading, error, data } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => fetchOneTodo(id)
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading && <div>...Loading</div>}
      {error && <div>{error.message}</div>}
      {data && (
        <Card className="max-w-md mx-auto mt-10 shadow-lg">
          <CardHeader className=" p-4">
            <CardTitle className="text-2xl font-bold">{data.title}</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="p-4">
            <CardDescription className="text-gray-700">{data.description}</CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TodoViewPage;
