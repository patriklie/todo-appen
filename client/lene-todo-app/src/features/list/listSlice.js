import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    lists: [],
    loading: false,
    error: null,
};

export const loadLists = createAsyncThunk(
    'list/loadLists',
    async () => {
        const token = localStorage.getItem("userToken")
        const response = await axios.get("http://localhost:5000/lists/", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }
);

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.lists = action.payload;
        },
        addList: (state, action) => {
            state.lists.push(action.payload);
        },
        addTodoToList: (state, action) => {
            const foundList = state.lists.find(list => list._id === action.payload.list);
            foundList.todos.push(action.payload);
        },
        toggleTodo: (state, action) => {
            console.log("Her er todo i list staten: ", action.payload);
            const foundList = state.lists.find(list => list._id === action.payload.list);
            const foundTodo = foundList.todos.find(todo => todo._id === action.payload._id);
            foundTodo.completed = !foundTodo.completed;
        },
        deleteTodoFromList: (state, action) => {
            const foundList = state.lists.find(list => list._id === action.payload.list);
            if(foundList) {
                foundList.todos = foundList.todos.filter(todo => todo._id !== action.payload._id);
            }
        },
        deleteListAndTodos: (state, action) => {
            state.lists = state.lists.filter(list => list._id !== action.payload._id);
        },
        deleteAllTodosFromlist: (state, action) => {
            const foundList = state.lists.find(list => list._id === action.payload);
            if(foundList) {
                foundList.todos = []
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadLists.fulfilled, (state, action) => {
                state.loading = "success";
                state.lists = action.payload;
            })
            .addCase(loadLists.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(loadLists.rejected, (state, action) => {
                state.loading = "Failed fetching lists";
                state.error = action.error.message;
            })
    }
})

export const { setList, addTodoToList, addList, toggleTodo, deleteTodoFromList, deleteListAndTodos, deleteAllTodosFromlist } = listSlice.actions;
export default listSlice.reducer;