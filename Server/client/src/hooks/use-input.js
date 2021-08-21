import { useState } from "react";

const useInput = (validateValue, initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  var valueIsValid = false;
  if (!value) valueIsValid = false;
  else valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  const onBlur = () => {
    setIsTouched(true);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  const onset = (value) => {
    setValue(value);
  };

  return {
    value,
    isTouched,
    valueIsValid,
    hasError,
    onBlur,
    onChange,
    onset,
    reset,
  };
};

export default useInput;
