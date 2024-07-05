import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    todos: [],
    status: "",
    error: null,
};

export const loadListTodos = createAsyncThunk(
    'todo/loadListTodos',
    async (listId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/todos/listtodos/${listId}`);
        return response.data;
    }
);

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            const { id } = action.payload;

            state.todos = state.todos.filter((todo) => {
                return todo._id !== id;
            })
        },
        toggleComplete: (state, action) => {
            console.log("Her er action payload i reducer: ", action.payload)
            const updatedTodo = action.payload;

            state.todos = state.todos.map(todo => {
                if(todo._id === updatedTodo._id) {
                    return updatedTodo;
                } else {
                    return todo;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadListTodos.fulfilled, (state, action) => {
                state.status = "success";
                state.todos = action.payload;
            })
            .addCase(loadListTodos.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(loadListTodos.rejected, (state, action) => {
                state.status = "Failed fetching todos";
                state.error = action.error.message;
            })
    }
});

export const { addTodo, removeTodo, toggleComplete, moveUp, moveDown } = todoSlice.actions;
export default todoSlice.reducer;