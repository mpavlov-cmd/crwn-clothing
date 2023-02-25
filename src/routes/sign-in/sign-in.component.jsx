import {fireBaseAuth, fireStoreRepo} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await fireBaseAuth.signInWithGooglePopUp();
        const userDocRef = await fireStoreRepo.createUserDocumentFromAuth(response);
        console.log(userDocRef);
    }

    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>Sign In Wih Google PopUp</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;