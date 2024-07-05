import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import listSlice from "./features/list/listSlice";
import todoSlice from "./features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        list: listSlice,
        todo: todoSlice,
    }
})