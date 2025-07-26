import { create } from "zustand";
import api from "@/lib/api";
import { Task } from "@/types/task";

interface TaskState {
  tasks: Task[];
  task: Task | null;
  completedTasks: Task[];
  fetchTasks: (listId: string) => Promise<void>;
  fetchTask: (taskId: string) => Promise<void>;
  addTask: (task: Partial<Task>) => Promise<void>;
  toggleComplete: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  resetTasks: () => void;
  selectedTaskId: string | null;
  setSelectedTask: (id: string | null) => void;
  getSelectedTask: () => Task | null;
  deselectTask: () => void;
}

export const useTasks = create<TaskState>((set, get) => ({
  tasks: [],
  task: null,
  completedTasks: [],
  selectedTaskId: null,
  setSelectedTask: (id: string | null) => set({ selectedTaskId: id }),

  getSelectedTask: () => {
    const { tasks, selectedTaskId } = get();
    console.log("selectedTaskId", selectedTaskId);

    return tasks.find((task) => task.id === selectedTaskId) || null;
  },
  deselectTask: () => set({ selectedTaskId: null }),

  fetchTasks: async (listId: string) => {
    const res = await api.get(`/lists/${listId}/tasks`);
    const allTasks = res.data as Task[];

    set({
      tasks: allTasks.filter((t) => !t.completed),
      completedTasks: allTasks.filter((t) => t.completed),
    });
  },

  fetchTask: async (taskId: string) => {
    const res = await api.get(`/tasks/${taskId}`);
    const task = res.data as Task;

    set({
      task: task,
    });
  },

  addTask: async (task: Partial<Task>) => {
    const res = await api.post("/tasks", task);
    const newTask = res.data as Task;

    if (newTask.completed) {
      set((state) => ({
        completedTasks: [...state.completedTasks, newTask],
      }));
    } else {
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    }
  },

  toggleComplete: async (taskId: string) => {
    const res = await api.patch(`/tasks/${taskId}/toggle`);
    const updated: Task = res.data;

    set((state) => {
      const isNowCompleted = updated.completed;

      const updatedTasks = state.tasks.filter((t) => t.id !== taskId);
      const updatedCompleted = state.completedTasks.filter(
        (t) => t.id !== taskId
      );

      return isNowCompleted
        ? {
            tasks: updatedTasks,
            completedTasks: [...updatedCompleted, updated],
          }
        : {
            tasks: [...updatedTasks, updated],
            completedTasks: updatedCompleted,
          };
    });
  },

  deleteTask: async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
      task: (state.task = null),
      completedTasks: state.completedTasks.filter((t) => t.id !== taskId),
    }));
  },

  resetTasks: () => set({ tasks: [], completedTasks: [], task: null }),
}));
