import { useState } from 'react';
import { messagesApi } from '../services/api/index.js';
import { isEmail } from '../utils/validators.js';
import { useForm } from './useForm.js';

const INITIAL = { name: '', email: '', subject: 'Feedback', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome.';
  if (!isEmail(values.email)) errors.email = 'Informe um e-mail válido.';
  if (values.message.trim().length < 10) errors.message = 'Escreva pelo menos 10 caracteres.';
  return errors;
}

/** Landing page contact form → POST /messages (with local fallback). */
export function useContactForm() {
  const [sentTo, setSentTo] = useState(null);

  const form = useForm({
    initialValues: INITIAL,
    validate,
    onSubmit: async (values) => {
      const result = await messagesApi.send({ ...values, createdAt: new Date().toISOString() });
      setSentTo(values.name.split(' ')[0]);
      form.reset();
      return result;
    },
  });

  return { ...form, sentTo, closeConfirmation: () => setSentTo(null) };
}
