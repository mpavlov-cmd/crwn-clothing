import {fireBaseAuth, fireStoreRepo} from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await fireBaseAuth.signInWithGooglePopUp();
        const userDocRef = await fireStoreRepo.createUserDocumentFromAuth(response);
        console.log(userDocRef);
    }

    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>LogIn</button>
        </div>
    )
}

export default SignIn;