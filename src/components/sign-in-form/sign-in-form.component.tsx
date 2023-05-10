import './sign-in-form.styles';
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import {ChangeEvent, FormEvent, MouseEvent, useState} from "react";
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(emailSignInStart(email, password));
        resetFormFields();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const logGoogleUser = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(googleSignInStart())
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
