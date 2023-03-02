import {useState} from "react";
import {fireBaseAuth, fireStoreRepo} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // This notation {...formFields, [name]: value} copies the original object and then overrides the value.
        // Square brackets [name]: value allow to use variable as object key
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submit", event);

        // Validate password
        if (password !== confirmPassword) {
            alert("Passwords does not match");
            return;
        }

        try {
            const createUserResult = await fireBaseAuth.createAuthUserWithEmailAndPassword(email, password);
            console.log(createUserResult);

            const storedUserRef = await fireStoreRepo.createUserDocumentFromAuth(createUserResult.user, {
                displayName: displayName
            });
            console.log(storedUserRef);

            resetFormFields();

        } catch (error) {
            alert("Error:" + error.message);
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                />
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
                <FormInput required
                       label='Confirm Password'
                       type='password'
                       name='confirmPassword'
                       value={confirmPassword}
                       onChange={handleChange}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;