import {createContext, useEffect, useReducer} from "react";
import {fireBaseAuth, fireStoreRepo} from "../utils/firebase/firebase.utils";


// Actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state, action) => {

    console.log("dispatched");
    console.log(action);

    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                // Always keep previous state
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

export const UserProvider = ({children}) => {

    // useReducer returns state and dispatch function which accepts action
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE, () => INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER,
            payload: user
        })
    }

    const value = {currentUser, setCurrentUser};

    // Effect callback return value will be executed when component unmounts, so we return the function
    useEffect(() => {
        return fireBaseAuth.onUserAuthStateChanged((user) => {
            if (user) {
                fireStoreRepo.createUserDocumentFromAuth(user).then()
            }
            setCurrentUser(user);
            // console.log(user);
        });
    }, [])

    // Provider is allowing any of it's children to access values inside of provider's state
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}