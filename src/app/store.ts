import { configureStore } from '@reduxjs/toolkit';
import { repositoryApi } from '../services/repository';
import kanbanReducer from '../features/kanbanSlice';
import repositoryLinkReducer from '../features/repositiryLinkSlice';

export const store = configureStore({
  reducer: {
    repositoryApi: repositoryApi.reducer,
    kanban: kanbanReducer,
    repositoryLink: repositoryLinkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(repositoryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
