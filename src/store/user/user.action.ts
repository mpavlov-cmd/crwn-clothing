import {USER_ACTION_TYPES} from "./user.types";
import {Action, ActionWithPayload, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {AdditionalInformation, UserData} from "../../utils/firebase/firebase.utils";


export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export type SignOutUserStart = Action<USER_ACTION_TYPES.SIGN_OUT_USER_START>
export type SignOutUserSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS>
export type AuthOperationFailure = ActionWithPayload<USER_ACTION_TYPES.AUTH_OPERATION_FAILURE, Error>
export type EmailSignUpStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    {email: string, password: string, displayName:string}>
export type EmailSignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS,
    { user: UserData, additionalDetails: AdditionalInformation }>
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    { email: string, password: string }>


export const checkUserSession = withMatcher((): CheckUserSession => {
        return createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
    }
)

export const googleSignInStart = withMatcher((): GoogleSignInStart => {
        return createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
    }
)

export const emailSignUpStart = withMatcher(
    (email: string, password: string, displayName: string): EmailSignUpStart => {
        return createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, {email, password, displayName});
    }
)

export const emailSignUpSuccess = withMatcher(
    (user: UserData, additionalDetails: AdditionalInformation): EmailSignUpSuccess => {
        return createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, {user, additionalDetails});
    }
)

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart => {
        return createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password});
    }
)

export const signInSuccess = withMatcher(
    (user: UserData): SignInSuccess => {
        return createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
    }
)

export const signOutUserStart = withMatcher(
    (): SignOutUserStart => {
        return createAction(USER_ACTION_TYPES.SIGN_OUT_USER_START);
    }
)

export const signOutUserSuccess = withMatcher((): SignOutUserSuccess => {
        return createAction(USER_ACTION_TYPES.SIGN_OUT_USER_SUCCESS);
    }
)

export const authOperationFailure = withMatcher(
    (error: Error): AuthOperationFailure => {
        return createAction(USER_ACTION_TYPES.AUTH_OPERATION_FAILURE, error);
    }
)

