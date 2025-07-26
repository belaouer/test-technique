"use client";

import { useTasks } from "@/stores/useTasks";
import { useLists } from "@/stores/useLists";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TaskSchema } from "@/lib/zod/taskSchema";

type TaskFormData = z.infer<typeof TaskSchema>;

export default function TaskForm() {
  const { selectedListId } = useLists();
  const { addTask } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(TaskSchema) });

  const onSubmit = async (data: TaskFormData) => {
    console.log("cliqué");

    if (!selectedListId) return;
    try {
      await addTask({ ...data, listId: selectedListId });
      reset();
      toast.success("Tâche ajoutée !");
    } catch (err) {
      console.error("Erreur lors de l’ajout", err);
      toast.error("Erreur lors de l’ajout de la tâche");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        {...register("title")}
        placeholder="Titre"
        className="w-full border p-3 rounded  border-gray-700 text-gray-400 text-sm italic"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <input
        {...register("shortDescription")}
        placeholder="Courte description"
        className="w-full border p-3 rounded  border-gray-700 text-gray-400 text-sm italic"
      />

      <textarea
        {...register("longDescription")}
        placeholder="Description détaillée"
        className="w-full border p-3 rounded  border-gray-700 text-gray-400 text-sm italic"
      />

      <input
        {...register("dueDate")}
        type="date"
        className="w-full border p-3 rounded  border-gray-700 text-gray-400 text-sm italic"
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-1 rounded"
      >
        Ajouter
      </button>
    </form>
  );
}
