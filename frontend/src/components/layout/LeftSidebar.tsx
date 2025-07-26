"use client";

import { useEffect, useState } from "react";
import { useLists } from "@/stores/useLists";
import { useTasks } from "@/stores/useTasks";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import LogoutButton from "../LogoutButton";

export default function LeftSidebar() {
  const {
    lists,
    selectedListId,
    fetchLists,
    createList,
    deleteList,
    setSelectedList,
  } = useLists();

  const { resetTasks, fetchTasks } = useTasks();
  const [newListName, setNewListName] = useState("");
  const [showConfirmDeleteId, setShowConfirmDeleteId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchLists();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedList(id);
    fetchTasks(id);
  };

  const handleCreate = async () => {
    if (!newListName.trim()) return;
    try {
      await createList(newListName);
      setNewListName("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteList(id);
    resetTasks();
    setShowConfirmDeleteId(null);
  };

  return (
    <div className="col-span-3 2xl:col-span-2 bg-gray-800 text-white h-full flex flex-col py-8 px-4 space-y-4 rounded-2xl shadow-xl">
      <h2 className="text-lg font-semibold">Mes listes</h2>

      <div className="flex space-x-2">
        <input
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Nouvelle liste"
          className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          onClick={handleCreate}
          disabled={newListName ? false : true}
          className="bg-indigo-600 px-3 py-2 rounded hover:bg-indigo-500 disabled:bg-gray-700"
        >
          +
        </button>
      </div>

      <ul className="space-y-2 overflow-y-auto flex-1">
        {lists.map((list) => (
          <li
            key={list.id}
            className={cn(
              "p-2 rounded cursor-pointer flex justify-between items-center",
              list.id === selectedListId
                ? "bg-indigo-600"
                : "bg-gray-700 hover:bg-gray-600"
            )}
          >
            <span onClick={() => handleSelect(list.id)} className="flex-1">
              {list.name}
            </span>
            <button
              onClick={() => setShowConfirmDeleteId(list.id)}
              className="text-red-400 hover:text-red-600 ml-2"
              title="Supprimer"
            >
              🗑
            </button>

            {/* Confirmation de suppression */}
            {showConfirmDeleteId === list.id && (
              <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white text-black p-6 rounded space-y-4">
                  <p>
                    Supprimer cette liste supprimera aussi toutes ses tâches.
                    Continuer ?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowConfirmDeleteId(null)}
                      className="px-4 py-2 bg-gray-300 rounded"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => handleDelete(list.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <LogoutButton />
      </div>
    </div>
  );
}
