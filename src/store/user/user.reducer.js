import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null
}

export const userSlice = createSlice({
    // Name will create namespace for actions
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            // state looks mutable, but actually reducers returns new state object (immer lib is used)
            state.currentUser = action.payload
        }
    }
});

// Actions and reducer can be exported from the slice
export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;