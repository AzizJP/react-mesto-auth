import { useState, useCallback } from "react";

export function useFormAndValidation(initialValues, initialErrors, initialValid) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialValid);

  const handleChange = (evt) => {
    const {
      name,
      value,
      validity: { valid },
    } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid({ ...isValid, [name]: valid });
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
  };
}
