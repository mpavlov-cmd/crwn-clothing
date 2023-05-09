import {takeLatest, all, call, put} from "typed-redux-saga/macro";
import {USER_ACTION_TYPES} from "./user.types";
import {
    authOperationFailure,
    EmailSignInStart, EmailSignUpStart, EmailSignUpSuccess,
    emailSignUpSuccess,
    signInSuccess,
    signOutUserSuccess
} from "./user.action";
import {AdditionalInformation, fireBaseAuth, fireStoreRepo} from "../../utils/firebase/firebase.utils";
import {User} from 'firebase/auth';

// Check user session
function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
    try {
        const userSnapshot = yield* call(
            [fireStoreRepo, fireStoreRepo.createUserDocumentFromAuth],
            userAuth,
            additionalInformation
        );
        if (userSnapshot) {
            yield* put(
                signInSuccess({
                        id: userSnapshot.id,
                        ...userSnapshot.data()
                    }
                ));
        }

    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* isUserAuthenticated() {
    try {
        const user = yield* call([fireBaseAuth, fireBaseAuth.getCurrentUser], );
        if (!user) {
            return;
        }
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// Google Sign In
function* signInWithGoogle() {
    try {
        const {user} = yield call([fireBaseAuth, fireBaseAuth.signInUserWithGooglePopUp], );
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* onGoogleSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

// Email Password Sign Up
function* emailAndPasswordSignUp({payload}: EmailSignUpStart) {

    const {email, password, displayName} = payload;

    try {
        const {user} = yield call(
            [fireBaseAuth, fireBaseAuth.createAuthUserWithEmailAndPassword],
            email,
            password
        );
        yield* put(
            emailSignUpSuccess(
                user,
                {
                    displayName: displayName
                }
            )
        )
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* signInAfterSignUp({payload}: EmailSignUpSuccess) {
    const {user, additionalDetails} = payload;
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalDetails)
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* onEmailPasswordSignUp() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, emailAndPasswordSignUp);
}

function* onEmailSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_SUCCESS, signInAfterSignUp);
}

// Email Password Sign In
function* signInWithEmailAndPassword({payload}: EmailSignInStart) {
    try {
        const {email, password} = payload;
        const {user} = yield call([fireBaseAuth, fireBaseAuth.signInUserWithEmailAndPassword], email, password);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}


function* onEmailPasswordSignIn() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

// Sign Out
function* signOutUser() {
    try {
        yield* call([fireBaseAuth, fireBaseAuth.signOutUser], );
        yield* put(signOutUserSuccess());
    } catch (error) {
        yield* put(authOperationFailure(error as Error));
    }
}

function* onSignOut() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_USER_START, signOutUser)
}

// Root User Saga
export function* userSaga() {
    yield* all(
        [
            call(onCheckUserSession),
            call(onGoogleSignIn),
            call(onSignOut),
            call(onEmailPasswordSignIn),
            call(onEmailPasswordSignUp),
            call(onEmailSignUpSuccess)
        ]
    )
}