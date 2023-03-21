import {CATEGORIES_ACTION_TYPES} from "./categories.types";

const INITIAL_STATE = {
    docs: []
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {

    const {type, payload} = action;

    switch (type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                // Always keep previous state
                ...state,
                docs: payload
            }
        // In redux action is received by all reducers, so in case triggered action is not supported by userReducer
        // there is a need to return existing state
        default:
            return state;
    }
}