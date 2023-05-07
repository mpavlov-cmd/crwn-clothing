import {CATEGORIES_ACTION_TYPES} from "./categories.types";
import {createAction} from "../../utils/reducer/reducer.utils";

// TODO Migrate to create action
export const fetchCategoriesStart = () => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export const fetchCategoriesSuccess = (categories) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
}

export const fetchCategoriesFailure = (error) => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);
}
