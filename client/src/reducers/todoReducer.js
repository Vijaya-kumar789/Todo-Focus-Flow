import { createSlice } from "@reduxjs/toolkit";

export const listTodoSlice = createSlice({
    name: 'todoList',
    initialState: {
        todo : [],
        editingTodo : null,
    },
    reducers : {
        setTodo : (state,action) => {
            state.todo = action.payload
            return state;
        },
        setEditingTodo: (state, action) => {
            state.editingTodo = action.payload; // Set the current Todo being edited
            return state;
        },
        clearEditingTodo: (state) => {
            state.editingTodo = null; // Clear the editingTodo when done editing
            return state;
        },
        setTodoByStatus : (state, action) => {
            state.todo = action.payload;
            return state;
        }
    }
})

export const { setTodo, setEditingTodo, clearEditingTodo, setTodoByStatus } = listTodoSlice.actions