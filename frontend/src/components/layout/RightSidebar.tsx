"use client";

import { useTasks } from "@/stores/useTasks";
import { useState } from "react";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function RightSidebar() {
  const { deleteTask, deselectTask, task } = useTasks();
  const [showModal, setShowModal] = useState(false);

  return (
    <aside className="col-span-3 2xl:col-span-2 bg-gray-800 text-white h-full flex flex-col py-8 px-4 space-y-4 rounded-2xl shadow-xl">
      {task ? (
        <div className="flex flex-col  items-start space-y-4">
          <h2 className="text-lg font-semibold">{task.title}</h2>

          {task.shortDescription && (
            <p className="text-gray-400 italic">{task.shortDescription}</p>
          )}

          {task.longDescription && (
            <p className="text-gray-300">{task.longDescription}</p>
          )}

          <div className="text-sm space-y-1 text-gray-400">
            <p>
              <span className="font-semibold">Échéance :</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Créée le :</span>{" "}
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
            >
              Supprimer
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 italic">Aucune tâche sélectionnée</div>
      )}

      {showModal && task && (
        <ConfirmDeleteModal
          title="Supprimer la tâche ?"
          message="Cette tâche sera définitivement supprimée."
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            deleteTask(task.id);
            setShowModal(false);
            deselectTask();
          }}
        />
      )}
    </aside>
  );
}
