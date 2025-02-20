import type { AddOrEditTaskProps } from '@app/features/task-manager/components/AddOrEditTask';

import { AddOrEditTask } from '@app/features/task-manager/components/AddOrEditTask';
import { TaskManagerHeader } from '@app/features/task-manager/components/TaskManagerHeader';
import { TaskManagerList } from '@app/features/task-manager/components/TaskManagerList';
import { useState } from 'react';
import '@app/features/task-manager/taskManager.scss';

export const TaskManager = () => {
  const [addOrEditTask, setAddOrEditTask] = useState<Omit<AddOrEditTaskProps, 'onClose'>>({
    isOpen: false,
    mode: 'add',
    taskId: '',
  });

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
        {addOrEditTask.isOpen && <AddOrEditTask {...addOrEditTask} onClose={onClose} />}
      </section>
    </main>
  );
};
