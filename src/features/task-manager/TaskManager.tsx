import type { AddOrEditTaskProps } from '@app/features/task-manager/components/AddOrEditTask';

import { useAppDispatch, useAppSelector } from '@app/app/hooks';
import { LoadingSpinner } from '@app/components/ui/LoadingSpinner';
import { AddOrEditTask } from '@app/features/task-manager/components/AddOrEditTask';
import { TaskManagerHeader } from '@app/features/task-manager/components/TaskManagerHeader';
import '@app/features/task-manager/taskManager.scss';
import { TaskManagerList } from '@app/features/task-manager/components/TaskManagerList';
import { fetchAllTasks } from '@app/features/task-manager/taskSlice';
import { useEffect, useState } from 'react';

export const TaskManager = () => {
  const dispatch = useAppDispatch();

  const [addOrEditTask, setAddOrEditTask] = useState<Omit<AddOrEditTaskProps, 'onClose'>>({
    isOpen: false,
    mode: 'add',
    taskId: '',
  });

  const loadingStatus = useAppSelector(state => state.tasks.loading);
  const isLoading = loadingStatus === 'pending' || loadingStatus === 'idle';

  useEffect(() => {
    void dispatch(fetchAllTasks());
  }, [dispatch]);

  const onClose = () => {
    setAddOrEditTask({ ...addOrEditTask, isOpen: false });
  };

  const onAddTask = () => {
    setAddOrEditTask({ isOpen: true, mode: 'add', taskId: '' });
  };

  const onEditTask = (taskId: string) => {
    setAddOrEditTask({ isOpen: true, mode: 'edit', taskId });
  };

  return (
    <main className="task-manager__wrapper">
      <section className="task-manager__container">
        <TaskManagerHeader onAddTask={onAddTask} />
        <TaskManagerList onEditTask={onEditTask} />
        {isLoading ? <LoadingSpinner /> : <TaskManagerList onEditTask={onEditTask} />}
        {addOrEditTask.isOpen && <AddOrEditTask {...addOrEditTask} onClose={onClose} />}
      </section>
    </main>
  );
};
