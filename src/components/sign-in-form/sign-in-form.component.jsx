import './sign-in-form.styles.scss';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {useState} from "react";
import {fireBaseAuth} from "../../utils/firebase/firebase.utils";

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

        <div className='sign-in-container'>
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
                <div className='buttons-container'>
                    <Button type='submit'>Log In</Button>
                    <Button type='button' onClick={logGoogleUser} buttonType='google' >Google Sign In</Button>
                </div>
            </form>
        </div>
    )

}

export default SignInForm;