import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    username: null,
    token: null,
    profileImageUrl: null,
    headerImageUrl: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.username = action.payload.username;
            
            if (action.payload.profileImageUrl) {
                state.profileImageUrl = action.payload.profileImageUrl;
            }

            if (action.payload.profileHeaderUrl) {
                state.headerImageUrl = action.payload.headerImageUrl;
            }

        },
        loginWithToken: (state, action) => {
            console.log("Logget inn med token")
            state.isAuth = true;
            state.token = action.payload.userToken
            state.username = action.payload.username;

            if (action.payload.profileImageUrl) {
                state.profileImageUrl = action.payload.profileImageUrl;
            }

            if (action.payload.profileHeaderUrl) {
                state.headerImageUrl = action.payload.headerImageUrl;
            }

        },
        logout: (state) => {
            state.isAuth = false;
            state.token = null;
            state.username = null;
            state.profileImageUrl = null;
            state.headerImageUrl = null;
        },
        addProfileImage: (state, action) => {
            state.profileImageUrl = action.payload.profileImage;
        },
        addHeaderImage: (state, action) => {
            state.headerImageUrl = action.payload.headerImage;
        }
    }
})

export const { loginUser, loginWithToken, logout, addProfileImage, addHeaderImage } = authSlice.actions;
export default authSlice.reducer;