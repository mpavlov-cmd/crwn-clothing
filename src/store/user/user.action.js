import {USER_ACTION_TYPES} from "./user.types";
import {createAction} from "../../utils/reducer/reducer.utils";

export const checkUserSession = () => {
    return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
}

export const googleSignInStart = () => {
    return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
}

export const emailSignUpStart = (email, password, displayName) => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email, password, displayName});
}

export const emailSignUpSuccess = (user, additionalDetails) => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, {user, additionalDetails});
}

export const emailSignInStart = (email, password) => {
    return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});
}

export const signInSuccess = (user) => {
    return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
}

export const signOutUserStart = () => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_USER_START);
}

export const signOutUserSuccess = () => {
    return createAction(USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS);
}

export const authOperationFailure = (error) => {
    return createAction(USER_ACTION_TYPES.AUTH_OPERATION_FAILURE, error);
}

