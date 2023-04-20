import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './tasks';

const store = configureStore({
  reducer: {
    taskbox: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
