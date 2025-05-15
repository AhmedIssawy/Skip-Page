import { createSlice } from '@reduxjs/toolkit';

import type { ThemeState } from '@/types/Index';

const initialState: ThemeState = {
    isDarkTheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
        },
        setTheme: (state, action) => {
            state.isDarkTheme = action.payload;
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;