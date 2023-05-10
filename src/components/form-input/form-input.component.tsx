import {FC, InputHTMLAttributes} from "react";
import './form-input.styles';
import {FormInputLabel, Group, StyledFormInput} from "./form-input.styles";

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {

    const safeShrink = Boolean(
        otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length
    );

    return (
        <Group className='group'>
            <StyledFormInput className='form-input' {...otherProps}/>
            {/*Will render only if label exists*/}
            {label && (
                <FormInputLabel
                    className='form-input-label'
                    shrink={safeShrink}>{label}</FormInputLabel>
            )}
        </Group>
    )

}

export default FormInput;
