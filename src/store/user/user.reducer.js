import {USER_ACTION_TYPES} from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                // Always keep previous state
                ...state,
                isLoading: false,
                error: null,
                currentUser: payload
            }
        case USER_ACTION_TYPES.AUTH_OPERATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case USER_ACTION_TYPES.EMAIL_SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null
            }
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case USER_ACTION_TYPES.SIGN_OUT_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: null
            }
        // In redux action is received by all reducers, so in case triggered action is not supported by userReducer
        // there is a need to return existing state
        default:
            return state;
    }
}