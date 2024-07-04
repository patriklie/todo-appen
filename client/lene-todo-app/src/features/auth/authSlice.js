import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    username: null,
    email: null,
    token: null,
    profileImageUrl: null,
    profileHeaderUrl: null,
    status: "",
    background: 18,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.email = action.payload.email;
            
            if (action.payload.profileImageUrl) {
                state.profileImageUrl = action.payload.profileImageUrl;
            }
            if (action.payload.profileHeaderUrl) {
                state.profileHeaderUrl = action.payload.profileHeaderUrl;
            }
        },
        loginWithToken: (state, action) => {
            console.log("Logget inn med token")
            state.isAuth = true;
            state.token = action.payload.token
            state.username = action.payload.username;
            state.email = action.payload.email;

            if (action.payload.profileImageUrl) {
                state.profileImageUrl = action.payload.profileImageUrl;
            }

            if (action.payload.profileHeaderUrl) {
                state.profileHeaderUrl = action.payload.profileHeaderUrl;
            }

        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            state.username = null;
            state.profileImageUrl = null;
            state.profileHeaderUrl = null;
        },
        addProfileImage: (state, action) => {
            state.profileImageUrl = action.payload;
        },
        addHeaderImage: (state, action) => {
            state.profileHeaderUrl = action.payload;
        },
        removeProfileImage: (state) => {
            state.profileImageUrl = null;
        },
        removeHeaderImage: (state) => {
            state.profileHeaderUrl = null;
        },
        oppdaterProfil: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        changeBackground: (state, action) => {
            state.background = action.payload;
        }
    }
})

export const { changeBackground, oppdaterProfil, loginUser, loginWithToken, logout, addProfileImage, addHeaderImage, removeHeaderImage, removeProfileImage } = authSlice.actions;
export default authSlice.reducer;