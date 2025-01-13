import { createSlice } from '@reduxjs/toolkit';
const tasksSlice = createSlice({
    name: 'tasks',
    initialState: { showModal: false },
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload;
        },
    },
});

export const { setShowModal } = tasksSlice.actions;

export default tasksSlice.reducer;
