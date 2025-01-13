import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = 'http://localhost:9000/';

export const authAPI = createApi({
    reducerPath: 'authapi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: 'users',
                method: 'GET',
            }),
            providesTags: ['Users'],
        }),
        registerUser: builder.mutation({
            query: ({ newUser }) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        setCurrentUser: builder.mutation({
            query: ({ id }) => ({
                url: 'currentUser',
                method: 'PUT',
                body: id,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
    useSetCurrentUserMutation,
    useDeleteUserMutation,
} = authAPI;
