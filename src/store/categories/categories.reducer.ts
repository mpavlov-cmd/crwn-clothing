import {Category} from "./categories.types";
import {
    fetchCategoriesFailure,
    fetchCategoriesStart,
    fetchCategoriesSuccess
} from "./categories.action";
import {AnyAction} from "redux";

export type CategoriesState = {
    readonly docs: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: CategoriesState = {
    docs: [],
    isLoading: false,
    error: null
}

// Pattern for passing types as an argument is called discriminator
export const categoriesReducer = (
    state = INITIAL_STATE,
    action = {} as AnyAction
) : CategoriesState => {

    if(fetchCategoriesStart.match(action)) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (fetchCategoriesSuccess.match(action)) {
        return {
            // Always keep previous state
            ...state,
            docs: action.payload,
            isLoading: false
        }
    }

    if (fetchCategoriesFailure.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    }

    return state;
}