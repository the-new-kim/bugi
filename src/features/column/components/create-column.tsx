import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useService } from '@/context/service-context';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
const formSchema = z.object({
  title: z.string().min(1),
});

function CreateColumn({ onSuccess }: { onSuccess: () => void }) {
  const { columnService } = useService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    columnService.create({ title: data.title, type: 'todo' }).then((res) => {
      if (res.ok) {
        onSuccess();
        form.reset();
      }
    });
  };

  return (
    <div className="flex justify-start items-start gap-2 min-w-[200px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="sticky top-0">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Create a new column" />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export { CreateColumn };
