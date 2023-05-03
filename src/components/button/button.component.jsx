import './button.styles';
import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

/*
default

inverted

google sign-in
 */

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    // Returns property of the object based on the argument
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
)

const Button = ({children, buttonType, isLoading, ...otherProps}) => {

    const CustomButton = getButton(buttonType);

    return (
        <CustomButton
            disabled={isLoading}
            className='button-container'
            {...otherProps}
        >
            {children}
        </CustomButton>
    )
}

export default Button;
