import { TaskManagerHeader } from "@app/features/task-manager/TaskManagerHeader";
import { TaskManagerList } from "@app/features/task-manager/TaskManagerList";

export const TaskManager = () => {
  return (
    <main className="task-manager__wrapper">
      <section className="task-manager__container">
        <TaskManagerHeader />
        <TaskManagerList />
      </section>
    </main>
  );
};
