import * as z from 'zod';

export const inputTextSchema = z.object({
  textInput: z
    .string({
      required_error: 'Input Text Required'
    })
    .min(3, {
      message: 'Title must be at least 3 characters'
    })
});

export type inputTextValues = z.infer<typeof inputTextSchema>;
