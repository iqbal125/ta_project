import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/Card';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteTodo } from '@/api/todo';
import { Button, buttonVariants } from '@/components/ui/Button';

interface TodoCardProps {
  id: string;
  title: string;
  description: string;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, title, description }: TodoCardProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success('Todo Deleted');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      toast.error('Todo Failed to Delete');
      console.error('Error Deleting todo:', error);
    }
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      mutation.mutate(id);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg">
      <CardHeader className=" p-4">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="p-4">
        <CardDescription className="text-gray-700">{description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-end space-x-4">
        <Button variant={'outline'} asChild>
          <Link to={`/todo/${id}`} className="text-blue-500 hover:text-blue-700 transition-colors">
            View
          </Link>
        </Button>
        <Button variant={'outline'} asChild>
          <Link
            to={`/todo/${id}/edit`}
            className="text-yellow-500 hover:text-yellow-700 transition-colors"
          >
            Edit
          </Link>
        </Button>
        <Button variant="destructive" onClick={handleDelete} className="transition-colors">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
