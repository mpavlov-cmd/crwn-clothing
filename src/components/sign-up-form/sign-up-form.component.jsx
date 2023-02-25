import {useState} from "react";
import {fireBaseAuth, fireStoreRepo} from "../../utils/firebase/firebase.utils";

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

            const storedUserRef = await fireStoreRepo.createUserDocumentFromAuth(createUserResult, {
                displayName: displayName
            });
            console.log(storedUserRef);

            resetFormFields();

        } catch (error) {
            alert("Error:" + error.message);
        }
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input required
                       type='text'
                       name='displayName'
                       value={displayName}
                       onChange={handleChange}
                />
                <label>Email</label>
                <input required
                       type='email'
                       name='email'
                       value={email}
                       onChange={handleChange}
                />
                <label>Password</label>
                <input required
                       type='password'
                       name='password'
                       value={password}
                       onChange={handleChange}
                />
                <label>Confirm Password</label>
                <input required
                       type='password'
                       name='confirmPassword'
                       value={confirmPassword}
                       onChange={handleChange}
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;