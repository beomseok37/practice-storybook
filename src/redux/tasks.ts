import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TaskType } from 'src/types';

interface StateType {
  tasks: TaskType[];
  status: string;
  error: string;
}

interface ActionType {
  id: string;
  newTaskState: string;
}

const initialState: StateType = {
  tasks: [],
  status: 'idle',
  error: '',
};

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?userId=1'
  );

  const data = await response.json();

  const result = data.map((task: any) => ({
    id: task.id,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
    updateAt: new Date(2021, 0, 1, 9, 0),
  }));
  return result;
});

const tasksSlice = createSlice({
  name: 'taskbox',
  initialState,
  reducers: {
    initiateTaskState: (state, action: PayloadAction<StateType>) => {
      state.tasks = action.payload.tasks;
      state.status = action.payload.status;
      state.error = action.payload.error;
    },
    updateTaskState: (state, action: PayloadAction<ActionType>) => {
      const { id, newTaskState } = action.payload;
      const task = state.tasks.findIndex((task) => task.id === id);
      if (task >= 0) {
        state.tasks[task].state = newTaskState;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = '';
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = '';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
        state.error = 'something went wrong';
        state.tasks = [];
      });
  },
});

export const { updateTaskState, initiateTaskState } = tasksSlice.actions;

export const selectTasks = (state: RootState) => {
  const tasksInOrder = [
    ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...state.taskbox.tasks.filter((t) => t.state === 'TASK_INBOX'),
  ];
  return tasksInOrder;
};
export const selectStatus = (state: RootState) => state.taskbox.status;
export const selectError = (state: RootState) => state.taskbox.error;
export { StateType };

export default tasksSlice.reducer;
