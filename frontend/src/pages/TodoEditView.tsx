import { zodResolver } from '@hookform/resolvers/zod';
import { todoFormSchema, todoFormValues } from '@/types/validations';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { putTodo } from '@/api/todo';
import { toast } from 'react-toastify';
import { errorMessageGeneral } from '@/utils/constants';

import { Todo } from '@/types/types';

export default function EditTodoForm() {
  const { id } = useParams<{ id: string }>(); // Fetch the id from the URL params
  if (!id) throw 'id not found';

  const queryClient = useQueryClient();

  const cachedData: Todo[] | undefined = queryClient.getQueryData(['todos']);
  const todo = cachedData?.find((todo) => todo.id === id);

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: todo?.title,
      description: todo?.description
    }
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description
      });
    }
  }, [todo, reset]);

  const mutation = useMutation({
    mutationFn: putTodo,
    onSuccess: (data) => {
      console.log(data);

      toast.success('Todo updated successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todo', id] });
    },
    onError: () => {
      toast.error(errorMessageGeneral);
    }
  });

  const onSubmit = ({ title, description }: todoFormValues) => {
    const putTodoProps: Todo = { id, title, description };
    mutation.mutate(putTodoProps);
  };

  return (
    <div className="grid justify-center items-center mt-8">
      <Card className="bg-background-light dark:bg-background-dark w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Edit Todo</CardTitle>
          <CardDescription>Edit the Todo with Title and Description</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...register('title')}
                        type="text"
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-background-light dark:bg-background-dark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
