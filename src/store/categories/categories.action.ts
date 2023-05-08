import {CATEGORIES_ACTION_TYPES, Category} from "./categories.types";
import {createAction, Action, ActionWithPayload, withMatcher} from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, Error>

export const fetchCategoriesStart = withMatcher(
    (): FetchCategoriesStart => {
        return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
    }
);

export const fetchCategoriesSuccess = withMatcher(
    (categories: Category[]): FetchCategoriesSuccess => {
        return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
    }
);

export const fetchCategoriesFailure = withMatcher(
    (error: Error): FetchCategoriesFailure => {
        return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);
    }
);
