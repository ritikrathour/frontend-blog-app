import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    theme:  localStorage.getItem("theme") ? localStorage.getItem("theme"):"light",
}
export const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
        toggleTheme: (state, action) => { 
            state.theme = state.theme === "dark" ? "light" : "dark"; 
            localStorage.setItem("theme",state.theme) 
        }
    }
}); 
export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;