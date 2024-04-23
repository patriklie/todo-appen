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
            const { id, completed } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            todoToUpdate.completed = !completed;
        },
        moveUp: (state, action) => {
            const { id } = action.payload;
            const index = state.todos.findIndex(item => item.id === id);
            if (index !== -1 && index > 0) {
                const tempObject = state.todos[index];
                state.todos[index] = state.todos[index - 1];
                state.todos[index - 1] = tempObject;
            }
        },
        moveDown: (state, action) => {
            const { id } = action.payload;
            const index = state.todos.findIndex(item => item.id === id);
            if (index !== -1 && index < state.todos.length -1) {
                const tempObject = state.todos[index];
                state.todos[index] = state.todos[index + 1];
                state.todos[index + 1] = tempObject;
            }
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