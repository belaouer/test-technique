import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "Titre requis"),
  shortDescription: z.string(),
  longDescription: z.string().optional(),
  dueDate: z.string(),
});

export type TaskFormData = z.infer<typeof TaskSchema>;
