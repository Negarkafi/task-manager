import type { Task } from "@app/features/task-manager/interfaces/task";

const ENDPOINT = "https://6166c3df13aa1d00170a66b9.mockapi.io/tasks";

interface TaskAPI {
  signal: AbortSignal | null | undefined;
}

const fetchAllTasks = async ({ signal }: TaskAPI) => {
  const response = await fetch(ENDPOINT, {
    signal,
  });

  const data = await response.json();
  return data as Task[];
};

const createTask = async ({
  signal,
  title,
  description,
}: Partial<Task> & TaskAPI) => {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  const data = await response.json();
  return data as Task;
};

const updateTask = async ({
  id,
  signal,
  title,
  description,
}: Partial<Task> & TaskAPI) => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to update task with id ${id}`);
  }

  const data = await response.json();
  return data as Task;
};

const deleteTask = async ({ signal, id }: Pick<Task, "id"> & TaskAPI) => {
  if (!id) {
    throw new Error("Task ID is required for deletion");
  }

  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task with id ${id}`);
  }

  return { success: true, id };
};

export default { fetchAllTasks, createTask, updateTask, deleteTask };
