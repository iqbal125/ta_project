import { zodResolver } from '@hookform/resolvers/zod';
import { todoFormSchema, todoFormValues } from '@/types/validations';
import { useForm } from 'react-hook-form';
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
import { postTodo } from '@/api/todo';
import { toast } from 'react-toastify';
import { errorMessageGeneral } from '@/utils/constants';
import { TodoCreate } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export default function TodosCreateForm() {
  const queryClient = useQueryClient();

  const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const {
    reset,
    register,
    formState: { isSubmitting }
  } = form;

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Todo updated successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      toast.error(errorMessageGeneral);
    }
  });

  const onSubmit = async (values: todoFormValues) => {
    const title = values.title;
    const description = values.description;
    const props: TodoCreate = { title, description };

    mutation.mutate(props);

    reset({ title: '', description: '' });
  };

  return (
    <div className="grid justify-center items-center mt-8">
      <Card className="w-96">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">New Todo</CardTitle>
          <CardDescription>Create a Todo with Title and Description</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...register('title')} type="text" className="" {...field} />
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
                      <Textarea className="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
