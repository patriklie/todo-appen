import { createSlice } from "@reduxjs/toolkit";
/* import { v4 as uuidv4 } from 'uuid'; */

const initialState = [];

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log(action.payload);
            state.push(action.payload);
        },
        removeTodo: (state, action) => {
            console.log(action.payload);
            const { id } = action.payload;

            return state.filter((task) => {
                return task.id !== id;
            })
        },
        toggleComplete: (state, action) => {
            const { id, completed } = action.payload;
            const todoToUpdate = state.find(todo => todo.id === id);
            todoToUpdate.completed = !completed;
        },
        moveUp: (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1 && index > 0) {
                const tempObject = state[index];
                state[index] = state[index - 1];
                state[index - 1] = tempObject;
            }

        },
        moveDown: (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex(item => item.id === id);
            if (index !== -1 && index < state.length -1) {
                const tempObject = state[index];
                state[index] = state[index + 1];
                state[index + 1] = tempObject;
            }
        }
    }
});

export const { addTodo, removeTodo, toggleComplete, moveUp, moveDown } = todoSlice.actions;
export default todoSlice.reducer;