import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    todos: [],
    status: "",
    error: null,
};

export const loadTodos = createAsyncThunk(
    'todo/loadTodos',
    async () => {
        const response = await axios.get('http://localhost:5000/todos');
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
            const { _id } = action.payload;
            console.log(action.payload);
            const updatedTodo = action.payload;

            state.todos = state.todos.map(todo => {
                if(todo._id === _id) {
                    return updatedTodo;
                } else {
                    return todo;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.status = "success";
                state.todos = action.payload;
            })
            .addCase(loadTodos.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(loadTodos.rejected, (state, action) => {
                state.status = "Failed fetching todos";
                state.error = action.error.message;
            })
    }
});

export const { addTodo, removeTodo, toggleComplete, moveUp, moveDown } = todoSlice.actions;
export default todoSlice.reducer;