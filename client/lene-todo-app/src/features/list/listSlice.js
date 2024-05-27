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
        addTodoToList: (state, action) => {

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

export const { setList, addTodoToList } = listSlice.actions;
export default listSlice.reducer;