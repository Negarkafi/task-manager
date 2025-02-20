interface Props {
  onAddTask: () => unknown;
}

export const TaskManagerHeader = ({ onAddTask }: Props) => {
  return (
    <header className="task-manager__header">
      <h1 className="task-manager__title">Task Manager</h1>
      <button className="task-manager__add-task" type="button" onClick={onAddTask}>
        Add Task
      </button>
    </header>
  );
};
