import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                // Always keep previous state
                ...state,
                currentUser: payload
            }
        // In redux action is received by all reducers, so in case triggered action is not supported by userReducer
        // there is a need to return existing state
        default:
            return state;
    }
}