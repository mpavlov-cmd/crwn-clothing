import './sign-in-form.styles';
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {useState} from "react";
import {fireBaseAuth} from "../../utils/firebase/firebase.utils";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const authResult = await fireBaseAuth.signInUserWithEmailAndPassword(email, password);
            console.log(authResult)
        } catch (error) {
            console.log(error);
            if (error.code === "auth/wrong-password") {
                alert("Incorrect password for email");
            } else {
                alert("Error:" + error.message);
            }
        } 

        resetFormFields();
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async (event) => {
        event.preventDefault();
        await fireBaseAuth.signInUserWithGooglePopUp();
    }

    return (

        <SignInContainer className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Enter email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    required
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                />
                <FormInput
                    label='Password'
                    required
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
                <ButtonsContainer className='buttons-container'>
                    <Button type='submit'>Log In</Button>
                    <Button type='button' onClick={logGoogleUser}
                            buttonType={BUTTON_TYPE_CLASSES.google} >Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )

}

export default SignInForm;
