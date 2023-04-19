import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { TaskType } from 'src/types';

interface StateType {
  tasks: TaskType[];
  status: string;
  error: any;
}

interface ActionType {
  id: string;
  newTaskState: string;
}

const initialState: StateType = {
  tasks: [],
  status: 'idle',
  error: null,
};

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
export { StateType };

export default tasksSlice.reducer;
