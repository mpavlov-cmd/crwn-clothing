import './form-input.styles.scss';

const FormInput = ({label, ...otherProps}) => {

    const labelClass = otherProps.value.length ? 'shrink' : '';

    return (
        <div className='group'>
            <input className='form-input' {...otherProps}/>
            {/*Will render only if label exists*/}
            {label && (
                <label className={labelClass + ' form-input-label'}>{label}</label>
            )}
        </div>
    )

}

export default FormInput;
