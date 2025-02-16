import { DeleteIcon } from "@app/components/icons/DeleteIcon";
import { EditIcon } from "@app/components/icons/EditIcon";

export const TaskManagerItem = () => {
  return (
    <div className="task-manager__task-item">
      <div className="task-manager__task-actions">
        <span className="task-manager__task-action task-manager__task-action--green">
          <EditIcon />
        </span>
        <span className="task-manager__task-action task-manager__task-action--red">
          <DeleteIcon />
        </span>
      </div>
      <img
        alt=""
        className="task-manager__task-img"
        src="https://loremflickr.com/640/480/nature"
      />
      <div className="task-manager__task-content">
        <h2 className="task-manager__task-title">Lorem ipsum</h2>
        <p className="task-manager__task-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          laborum quidem rerum in quis voluptatum voluptates, ipsa a, sint illum
          soluta culpa saepe magnam adipisci architecto dicta repellat! Fugit,
          dicta.
        </p>
      </div>
    </div>
  );
};
