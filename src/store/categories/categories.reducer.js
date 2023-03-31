import {CATEGORIES_ACTION_TYPES} from "./categories.types";

const INITIAL_STATE = {
    docs: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                // Always keep previous state
                ...state,
                docs: payload,
                isLoading: false
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false
            }
        // In redux action is received by all reducers, so in case triggered action is not supported by userReducer
        // there is a need to return existing state
        default:
            return state;
    }
}