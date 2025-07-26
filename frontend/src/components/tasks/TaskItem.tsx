"use client";

import { Task } from "@/types/task";
import { useTasks } from "@/stores/useTasks";
import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { toggleComplete } = useTasks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setLoading(true);
    setError("");
    try {
      await toggleComplete(task.id);
    } catch (err) {
      setError("Erreur lors du changement de statut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${
        task.completed
          ? "bg-green-900 border-green-700"
          : "bg-gray-800 border-gray-700"
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={loading}
        title="Basculer l'état"
        className="mt-1"
      >
        {task.completed ? (
          <CheckCircle className="text-green-400 w-6 h-6" />
        ) : (
          <Circle className="text-gray-400 w-6 h-6" />
        )}
      </button>

      <div className="flex-1 text-white">
        <p className="font-semibold">{task.shortDescription}</p>
        {task.description && (
          <p className="text-gray-400 mt-1 text-sm">{task.description}</p>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}
