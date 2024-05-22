import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
    name: "authenticationUser", 
    initialState: {
        loading: false,
        data:  null,
        error: null,
        updatedUser: null,
        signout: false
    },
    reducers: {
        signInStart: (state, action) => {
            state.loading = action.payload
            state.error = null
        },
        signInSuccess: (state, action) => {  
            state.loading = false
            state.data = action.payload; 
            state.error = null
        },
        signInFailare: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        updateStart: (state, action) => {
            state.loading = action.payload
            state.error = null
        },
        updateSuccess: (state, action) => {
            state.loading = false
            state.data = action.payload;
            state.updatedUser = action.payload 
            state.error = null
        },
        updateFailare: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        signOutStart: (state, action) => {
            state.loading = action.payload
            state.error = null
        },
        signOutSuccess: (state, action) => {
            state.loading = false
            state.data = null
            state.signout = action.payload 
            state.error = null
        },
        signOutFailare: (state, action) => {
            state.loading = false
            state.error = action.payload
        }

    }
});
export const { signInStart, signInSuccess, signInFailare, updateFailare, updateStart, updateSuccess, signOutStart, signOutSuccess, signOutFailare } = AuthSlice.actions;
export default AuthSlice.reducer;