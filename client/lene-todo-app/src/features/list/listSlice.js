import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    lists: [],
    loading: false,
    error: null,
};

const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setList: (state, action) => {
            state.lists = action.payload;
        }
    }
})

export const { setList } = listSlice.actions;
export default listSlice.reducer;