import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://localhost:9000/';

export const taskAPI = createApi({
    reducerPath: 'taskapi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
    }),
    endpoints: (builder) => ({
        getTasksByUserID: builder.query({
            query: ({ userID }) => ({
                url: `tasks?userID=${userID}`,
                method: 'GET',
            }),
            providesTags: ['Tasks'],
        }),

        addTaskToUser: builder.mutation({
            query: ({ newTask }) => ({
                url: 'tasks',
                method: 'POST',
                body: newTask,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Tasks'],
        }),

        deleteTaskFromUser: builder.mutation({
            query: ({ id }) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Tasks'],
        }),

        setTaskStatus: builder.mutation({
            query: ({ id, status, userID }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: { status },
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetTasksByUserIDQuery,
    useAddTaskToUserMutation,
    useDeleteTaskFromUserMutation,
    useSetTaskStatusMutation,
} = taskAPI;
