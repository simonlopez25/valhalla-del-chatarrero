import { useState } from 'react';
import { createProduct } from '../../../services/products.js';

export default function useCreateProduct(onSuccess) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function submitProduct(data) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSuccess(false);

    try {
      await createProduct(data);
      setSuccess(true);
      onSuccess?.();
      return true;
    } catch (err) {
      setSubmitError(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetState() {
    setIsSubmitting(false);
    setSubmitError(null);
    setSuccess(false);
  }

  return { submitProduct, isSubmitting, submitError, success, resetState };
}
