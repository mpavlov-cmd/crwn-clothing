import {takeLatest, all, call, put} from "redux-saga/effects";
import {fireStoreRepo} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailure, fetchCategoriesSuccess} from "./categories.action";
import {CATEGORIES_ACTION_TYPES} from "./categories.types";


function* fetchCategoriesAsync() {
    try {
        // call takes function as a first argument and function params as other arguments
        // yield can be used instead of await for async function inside the generator
        // in case object method is used context should be passed to call method and object should be passed
        // as part of the context:
        // https://stackoverflow.com/questions/58397875/reference-to-this-is-null-in-function-called-by-redux-saga-call
        const categoriesAndDocs = yield call([fireStoreRepo, fireStoreRepo.getCategoriesAndDocuments], );
        // put is used instead of dispatch in redux-saga
        yield put(fetchCategoriesSuccess(categoriesAndDocs));
    } catch (error) {
        yield put(fetchCategoriesFailure(error))
    }
}

function* onFetchCategories() {
    // take latest will only respond to the latest action when multiple actions
    // of the same type are executed in the row
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // Run everything inside (passed as an array) and only complete when everything is done
    yield all(
        [call(onFetchCategories)]
    )
}
