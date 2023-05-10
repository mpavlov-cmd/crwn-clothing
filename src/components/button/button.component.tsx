import {FC, ButtonHTMLAttributes, ReactNode} from 'react';
import './button.styles';
import {BaseButton, GoogleSignInButton, InvertedButton} from "./button.styles";

/*
default

inverted

google sign-in
 */

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => (
    // Returns property of the object based on the argument
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]
)

export type ButtonProps = {
    children?: ReactNode;
    buttonType?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({children, buttonType, ...otherProps}) => {

    const CustomButton = getButton(buttonType);

    return (
        <CustomButton
            className='button-container'
            {...otherProps}
        >
            {children}
        </CustomButton>
    )
}

export default Button;
