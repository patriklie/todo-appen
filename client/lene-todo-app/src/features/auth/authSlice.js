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
            console.log("Logget inn med token")
            state.isAuth = true;
            state.username = action.payload.username;
        },
        logout: (state, action) => {
            state.isAuth = false;
            state.username = null;
        }
    }
})

export const { loginUser, loginWithToken, logout } = authSlice.actions;
export default authSlice.reducer;