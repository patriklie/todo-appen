import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    username: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuth = true;
            state.token = action.payload.token
            state.username = action.payload.username;
        },
        loginWithToken: (state, action) => {
            console.log("Logget inn med token")
            state.isAuth = true;
            state.token = action.payload.userToken
            state.username = action.payload.username;
        },
        logout: (state, action) => {
            state.isAuth = false;
            state.token = null;
            state.username = null;
        }
    }
})

export const { loginUser, loginWithToken, logout } = authSlice.actions;
export default authSlice.reducer;