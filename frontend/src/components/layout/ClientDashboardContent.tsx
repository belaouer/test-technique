"use client";

import { useLists } from "@/stores/useLists";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";

export default function ClientDashboardContent() {
  const { selectedListId } = useLists();

  return (
    <div className="bg-gray-800 text-white h-full flex flex-col py-8 px-2 space-y-4 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-extrabold mb-6 text-white text-center">
        Mes tâches
      </h1>

      {selectedListId ? (
        <>
          <TaskForm />
          <div className="mt-8">
            <TaskList />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-400 py-20">
          <p className="text-lg font-semibold mb-2">
            Aucune liste sélectionnée
          </p>
          <p className="text-sm">
            Veuillez sélectionner une liste à gauche pour afficher ou créer des
            tâches.
          </p>
        </div>
      )}
    </div>
  );
}
