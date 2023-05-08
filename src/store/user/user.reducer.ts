import {UserData} from "../../utils/firebase/firebase.utils";
import {AnyAction} from "redux";
import {
    authOperationFailure, emailSignInStart,
    emailSignUpStart,
    emailSignUpSuccess,
    googleSignInStart,
    signInSuccess,
    signOutUserStart,
    signOutUserSuccess
} from "./user.action";

export type UserState = {
    currentUser: UserData | null;
    isLoading: boolean,
    error: Error | null

};

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

    if (signInSuccess.match(action)) {
        return {
            // Always keep previous state
            ...state,
            isLoading: false,
            error: null,
            currentUser: action.payload
        }
    }

    if (authOperationFailure.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: action.payload
        }
    }

    if (googleSignInStart.match(action)) {
        return {
            ...state,
            isLoading: true,
            error: null
        }
    }

    if (emailSignUpStart.match(action)) {
        return {
            ...state,
            isLoading: true,
            error: null
        }
    }

    if (emailSignUpSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            error: null
        }
    }

    if (emailSignInStart.match(action)) {
        return {
            ...state,
            isLoading: true,
            error: null
        }
    }

    if (signOutUserStart.match(action)) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (signOutUserSuccess.match(action)) {
        return {
            ...state,
            isLoading: false,
            currentUser: null
        }
    }

    return state;
}