import { useAppDispatch, useAppSelector } from "@app/app/hooks";
import { TaskManagerItem } from "@app/features/task-manager/components/TaskManagerItem";
import { fetchAllTasks, selectAllTasks } from "../taskSlice";
import { useEffect } from "react";

interface Props {
  onEditTask: (taskId: string) => void;
}

export const TaskManagerList = ({ onEditTask }: Props) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);

  useEffect(() => {
    void dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <section className="task-manager__task-list">
      {tasks.map((task) => {
        return (
          <TaskManagerItem key={task.id} {...task} onEditTask={onEditTask} />
        );
      })}
    </section>
  );
};
