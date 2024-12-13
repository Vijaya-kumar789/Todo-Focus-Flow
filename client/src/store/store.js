import { configureStore } from "@reduxjs/toolkit";
import { listTodoSlice } from "../reducers/todoReducer";

export const store = configureStore({
    reducer : {
        app: listTodoSlice.reducer,
    }
})

