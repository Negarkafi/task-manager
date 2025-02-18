import type { Task } from "@app/features/task-manager/interfaces/task";

import { useAppDispatch, useAppSelector } from "@app/app/hooks";
import Modal from "@app/components/ui/Modal";
import {
  createTask,
  selectTaskById,
  updateTask,
} from "@app/features/task-manager/taskSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export interface AddOrEditTaskProps {
  isOpen: boolean;
  mode: "add" | "edit";
  taskId: string;
  onClose: () => void;
}

// eslint-disable-next-line complexity
export const AddOrEditTask = ({
  taskId,
  mode,
  isOpen,
  onClose,
}: AddOrEditTaskProps) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => selectTaskById(state, taskId));
  const taskLoading = useAppSelector(
    (state) => state.tasks.addOrEditTaskLoading
  );
  const [error, setError] = useState<string | null>(null);

  const initialValues = {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    title: task?.title || "",
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    description: task?.description || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
  });

  const onAddTask = async (newTask: Partial<Task>) => {
    const res = await dispatch(createTask(newTask));
    if (res.meta.requestStatus === "fulfilled") {
      onClose();
    }
    if (res.meta.requestStatus === "rejected") {
      setError("Error while creating task");
    }
  };

  const onEditTask = async (updatedTask: Partial<Task>) => {
    updatedTask.id = taskId;
    const res = await dispatch(updateTask(updatedTask));
    if (res.meta.requestStatus === "fulfilled") {
      onClose();
    }
    if (res.meta.requestStatus === "rejected") {
      setError("Error while updating task");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError(null);
      if (mode === "add") {
        await onAddTask(values);
      } else {
        await onEditTask(values);
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      title={mode === "add" ? "Create Task" : "Edit Task"}
      onClose={onClose}
    >
      <div className="add-or-edit-task">
        <form className="add-or-edit-task__form" onSubmit={formik.handleSubmit}>
          <div className="add-or-edit-task__form-group">
            <label className="add-or-edit-task__form-label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`add-or-edit-task__form-input ${
                formik.touched.title && formik.errors.title ? "error" : ""
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="error-message">{formik.errors.title}</div>
            )}
          </div>

          <div className="add-or-edit-task__form-group">
            <label
              className="add-or-edit-task__form-label"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className={`add-or-edit-task__form-input add-or-edit-task__form-input--textarea ${
                formik.touched.description && formik.errors.description
                  ? "error"
                  : ""
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error-message">{formik.errors.description}</div>
            )}
          </div>

          <div className="add-or-edit-task__form-group">
            <button
              className="add-or-edit-task__form-submit"
              disabled={taskLoading}
              type="submit"
            >
              {taskLoading ? "pending..." : "Submit"}
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </form>
      </div>
    </Modal>
  );
};
