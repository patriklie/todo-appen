import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
        },
        logout: (state, action) => {
            state.isAuth = false;
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;