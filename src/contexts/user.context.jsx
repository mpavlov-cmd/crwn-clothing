import {createContext, useEffect, useState} from "react";
import {fireBaseAuth, fireStoreRepo} from "../utils/firebase/firebase.utils";


// Actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({children}) => {

    // State for current user
    const [currentUser, setCurrentUser] = useState(null);
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