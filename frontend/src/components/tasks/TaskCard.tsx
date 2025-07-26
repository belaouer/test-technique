"use client";

import { Task } from "@/types/task";
import { useTasks } from "@/stores/useTasks";

interface Props {
  task: Task;
  completed?: boolean;
}

export default function TaskCard({ task, completed = false }: Props) {
  const { toggleComplete } = useTasks();

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg shadow-md border ${
        completed
          ? "bg-gray-700 border-gray-600"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <div>
        <h3
          className={`font-semibold ${
            completed ? "line-through text-gray-400" : "text-white"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-400">{task.dueDate}</p>
      </div>
      <button
        onClick={() => toggleComplete(task.id)}
        className={`px-3 py-1 rounded font-medium text-white transition ${
          completed
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {completed ? "Annuler" : "Terminer"}
      </button>
    </div>
  );
}
