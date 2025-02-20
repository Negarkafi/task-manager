import type { RootState } from '@app/app/hooks';
import type { Task } from '@app/features/task-manager/interfaces/task';
import type { EntityState } from '@reduxjs/toolkit';

import taskAPI from '@app/features/task-manager/services/taskAPI';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async (_, thunkAPI) => {
  const response = await taskAPI.fetchAllTasks({ signal: thunkAPI.signal });
  return response;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Partial<Task>, thunkAPI) => {
  const response = await taskAPI.createTask({
    signal: thunkAPI.signal,
    ...task,
  });
  return response;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Partial<Task>, thunkAPI) => {
  const response = await taskAPI.updateTask({
    signal: thunkAPI.signal,
    ...task,
  });
  return response;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string, thunkAPI) => {
  const response = await taskAPI.deleteTask({ signal: thunkAPI.signal, id });
  return response;
});

export const tasksAdapter = createEntityAdapter<Task>();

interface TaskState extends EntityState<Task, Task['id']> {
  addOrEditTaskLoading: boolean;
  loading: 'failed' | 'idle' | 'pending' | 'succeeded';
}

const initialState: TaskState = tasksAdapter.getInitialState({
  loading: 'idle',
  addOrEditTaskLoading: false,
});

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllTasks.pending, state => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      tasksAdapter.upsertMany(state, action);
    });
    builder.addCase(fetchAllTasks.rejected, state => {
      state.loading = 'failed';
    });
    builder.addCase(createTask.pending, state => {
      state.addOrEditTaskLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.addOrEditTaskLoading = false;
      tasksAdapter.addOne(state, payload);
    });
    builder.addCase(createTask.rejected, state => {
      state.addOrEditTaskLoading = false;
    });
    builder.addCase(updateTask.pending, state => {
      state.addOrEditTaskLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      state.addOrEditTaskLoading = false;
      const { id, ...changes } = payload;
      tasksAdapter.updateOne(state, { id, changes });
    });
    builder.addCase(updateTask.rejected, state => {
      state.addOrEditTaskLoading = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      tasksAdapter.removeOne(state, payload.id);
    });
  },
});

export const {
  selectById: selectTaskById,
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTotalTasks,
} = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const _ = taskSlice.actions;

export default taskSlice.reducer;
