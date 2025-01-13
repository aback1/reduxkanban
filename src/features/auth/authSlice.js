import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser: '',
        users: [
            {
                id: '',
                name: '',
                password: '',
            },
        ],
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload.id;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = '';
            state.isLoggedIn = false;
        },
        register: (state, action) => {
            state.isLoggedIn = true;
            state.users.push(action.payload);
            state.currentUser = action.payload.id;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});

export const { login, logout, register, setCurrentUser, setUsers } =
    authSlice.actions;
export default authSlice.reducer;
