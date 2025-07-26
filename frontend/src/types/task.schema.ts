import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  dueDate: z.string().min(1, "La date d'échéance est requise"),
  listId: z.string().min(1, "La liste est requise"),
});

export type TaskInput = z.infer<typeof taskSchema>;
