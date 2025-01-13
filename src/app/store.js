import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import tasksReducer from '../features/tasks/tasksSlice.js';
import { taskAPI } from '../api/tasksApi.js';
import { authAPI } from '../api/authApi.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
        [taskAPI.reducerPath]: taskAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(taskAPI.middleware)
            .concat(authAPI.middleware),
});

export default store;
