import { useAppDispatch, useAppSelector } from "@app/app/hooks";
import { TaskManagerItem } from "@app/features/task-manager/components/TaskManagerItem";
import { fetchAllTasks, selectAllTasks } from "../taskSlice";
import { useEffect } from "react";

export const TaskManagerList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);

  useEffect(() => {
    void dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <section className="task-manager__task-list">
      {tasks.map((task) => {
        return <TaskManagerItem key={task.id} {...task} />;
      })}
    </section>
  );
};
