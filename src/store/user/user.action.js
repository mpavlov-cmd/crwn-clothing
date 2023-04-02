import {USER_ACTION_TYPES} from "./user.types";

export const setCurrentUser = (user) => {
   return {
       type: USER_ACTION_TYPES.SET_CURRENT_USER,
       payload: user
   }
}

export const checkUserSession = () => {
    return {
        type: USER_ACTION_TYPES.CHECK_USER_SESSION
    }
}

export const googleSignInStart = () => {
    return {
        type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
    }
}

export const emailSignUpStart = (email, password, displayName) => {
    return {
        type: USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
        payload: {email, password, displayName}
    }
}

export const emailSignUpSuccess = (user, additionalDetails) => {
    return {
        type: USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS,
        payload: {user, additionalDetails}
    }
}

export const emailSignInStart = (email, password) => {
    return {
        type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
        payload: {email, password}
    }
}

export const signInSuccess = (user) => {
    return {
        type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signOutUserStart = () => {
    return {
        type: USER_ACTION_TYPES.SIGN_OUT_USER_START
    }
}

export const signOutUserSuccess = () => {
    return {
        type: USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS
    }
}

export const authOperationFailure = (error) => {
    return {
        type: USER_ACTION_TYPES.AUTH_OPERATION_FAILURE,
        payload: error
    }
}

