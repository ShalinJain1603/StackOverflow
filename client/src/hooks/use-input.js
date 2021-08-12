import React, { useState } from 'react';

const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    const hasError = !valueIsValid && isTouched;

    const onBlur = () => {
        setIsTouched(true);
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const reset = () => {
        setValue('');
        setIsTouched(false);
    }

    return {
        value,
        isTouched,
        valueIsValid,
        hasError,
        onBlur,
        onChange
    }
}

export default useInput;