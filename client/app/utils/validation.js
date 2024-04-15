import Validator from 'validatorjs';
import DOMPurify from 'dompurify';

export const allFieldsValidation = (data, rules, messages) => {
  const validation = new Validator(data, rules, messages);
  const validationResponse = { isValid: validation.passes(), errors: null };

  if (!validationResponse.isValid) {
    validationResponse.errors = validation.errors.all();
  }

  return validationResponse;
};

export const santizeFields = data => {
  const fields = { ...data };

  for (let field in fields) {
    if (typeof field === 'string') {
      fields[field] = DOMPurify.sanitize(fields[field], {
        USE_PROFILES: { html: false }
      });
    }
  }
  return fields;
};
