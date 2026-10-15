import { useMemo, useState } from 'react';

/**
 * Generic controlled form with validation.
 * `validate(values)` returns { field: 'mensagem de erro' }.
 * Errors only show after the field is touched or the form is submitted.
 */
export function useForm({ initialValues, validate = () => ({}), onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const errors = useMemo(() => validate(values), [validate, values]);
  const isValid = Object.keys(errors).length === 0;

  const errorFor = (name) => (touched[name] || submitted ? errors[name] : undefined);

  const field = (name) => ({
    name,
    value: values[name],
    onChange: (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setValues((current) => ({ ...current, [name]: value }));
      setFormError('');
    },
    onBlur: () => setTouched((current) => ({ ...current, [name]: true })),
    error: errorFor(name),
  });

  async function handleSubmit(e) {
    e?.preventDefault();
    setSubmitted(true);
    if (!isValid || submitting) return;
    setSubmitting(true);
    setFormError('');
    try {
      await onSubmit(values);
    } catch (error) {
      setFormError(error.message || 'Algo deu errado. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
    setFormError('');
  }

  return { values, setValues, errors, isValid, field, errorFor, handleSubmit, submitting, formError, reset };
}
