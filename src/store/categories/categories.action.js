import {CATEGORIES_ACTION_TYPES} from "./categories.types";
import {fireStoreRepo} from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const fetchCategoriesFailure = (error) => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
        payload: error
    }
}

// Thunk action should by convention end with Async
export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesAndDocs = await fireStoreRepo.getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesAndDocs))
    } catch (error) {
        dispatch(fetchCategoriesFailure(error))
    }
}