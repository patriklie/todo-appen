import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuth: false,
    username: null,
    token: null,
    profileImageUrl: null,
    profileHeaderUrl: null,
    status: "",
}

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (token) => {
        const response = await axios.get(`http://localhost:5000/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
              }
        });
        return response.data;
    }
);

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
                state.profileHeaderUrl = action.payload.profileHeaderUrl;
            }

        },
        loginWithToken: (state, action) => {
            console.log("Logget inn med token")
            state.isAuth = true;
            state.token = action.payload.token
            state.username = action.payload.username;

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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profileImageUrl = action.payload.profileImageUrl;
                state.profileHeaderUrl = action.payload.profileHeaderUrl;
                state.status = "updated";
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "Failed updating profile";
            })
    }
})

export const { loginUser, loginWithToken, logout, addProfileImage, addHeaderImage } = authSlice.actions;
export default authSlice.reducer;