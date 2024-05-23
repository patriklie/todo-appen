import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    username: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuth = true;
            state.username = action.payload.username;
        },
        loginWithToken: (state, action) => {
            state.isAuth = true;
        },
        logout: (state, action) => {
            state.isAuth = false;
        }
    }
})

export const { loginUser, loginWithToken, logout } = authSlice.actions;
export default authSlice.reducer;