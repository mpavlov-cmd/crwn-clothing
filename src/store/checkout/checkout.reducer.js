import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    paymentInProgress: false
}

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: INITIAL_STATE,
    reducers: {
        setPaymentInProgress(state, action) {
            state.paymentInProgress = action.payload;
        }
    }
});

export const {setPaymentInProgress} = checkoutSlice.actions;
export const checkoutReducer = checkoutSlice.reducer;