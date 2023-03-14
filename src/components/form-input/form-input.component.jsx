import './form-input.styles';
import {FormInputLabel, Group, StyledFormInput} from "./form-input.styles";

const FormInput = ({label, ...otherProps}) => {

    return (
        <Group className='group'>
            <StyledFormInput className='form-input' {...otherProps}/>
            {/*Will render only if label exists*/}
            {label && (
                <FormInputLabel
                    className='form-input-label'
                    shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}
        </Group>
    )

}

export default FormInput;
