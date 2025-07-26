"use client";

import { useTasks } from "@/stores/useTasks";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function TaskList() {
  const { tasks, fetchTask, completedTasks, toggleComplete, setSelectedTask } =
    useTasks();

  const [showCompleted, setShowCompleted] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedTask(id);
    fetchTask(id);
  };

  return (
    <div className="space-y-8">
      {/* Tâches en cours */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Tâches en cours
        </h3>
        <ul className="rounded-2xl overflow-hidden border border-gray-700">
          {tasks.length === 0 && (
            <li className="bg-gray-700 text-gray-400 text-sm italic p-4">
              Aucune tâche en cours
            </li>
          )}
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-700 px-4 py-3 border-b border-gray-600 text-white hover:bg-gray-600 transition"
              onClick={() => handleSelect(task.id)}
            >
              <span>{task.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleComplete(task.id);
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded text-sm transition"
              >
                Terminer
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tâches terminées */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-white">Tâches terminées</h3>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-white hover:text-gray-300 transition"
          >
            {showCompleted ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {showCompleted && (
          <ul className="rounded-2xl overflow-hidden border border-gray-700">
            {completedTasks.length === 0 ? (
              <li className="bg-gray-700 text-gray-400 text-sm italic p-4">
                Aucune tâche terminée
              </li>
            ) : (
              completedTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-gray-900 px-4 py-3 border-b border-gray-700 text-gray-400 line-through hover:bg-gray-800 transition"
                >
                  <span>{task.title}</span>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Réactiver
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
