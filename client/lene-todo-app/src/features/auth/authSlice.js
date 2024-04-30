import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    userToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.userToken = action.payload;
        },
        logout: (state, action) => {
            state.isAuth = false;
            state.userToken = null;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;