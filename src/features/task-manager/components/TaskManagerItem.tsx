import type { Task } from '@app/features/task-manager/interfaces/task';

import { useAppDispatch } from '@app/app/hooks';
import { DeleteIcon } from '@app/components/icons/DeleteIcon';
import { EditIcon } from '@app/components/icons/EditIcon';
import { deleteTask } from '@app/features/task-manager/taskSlice';

export const TaskManagerItem = ({ description, id, image, title, onEditTask }: Task & { onEditTask: (taskId: string) => void }) => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    void dispatch(deleteTask(id));
  };

  const onEdit = () => {
    onEditTask(id);
  };

  return (
    <div className="task-manager__task-item">
      <div className="task-manager__task-actions">
        <span className="task-manager__task-action task-manager__task-action--green" onClick={onEdit} onKeyDown={onEdit}>
          <EditIcon />
        </span>
        <span className="task-manager__task-action task-manager__task-action--red" onClick={onDelete} onKeyDown={onDelete}>
          <DeleteIcon />
        </span>
      </div>
      <img alt="" className="task-manager__task-img" src={image} />
      <div className="task-manager__task-content">
        <h2 className="task-manager__task-title">{title}</h2>
        <p className="task-manager__task-description">{description}</p>
      </div>
    </div>
  );
};
