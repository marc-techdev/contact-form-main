const form = document.getElementById('contactForm');
const toast = document.getElementById('successToast');

const inputs = {
  firstName: document.getElementById('firstName'),
  lastName: document.getElementById('lastName'),
  email: document.getElementById('email'),
  message: document.getElementById('message'),
  consent: document.getElementById('consent')
};
const queryRadios = document.querySelectorAll('input[name="queryType"]');

const emailPlaceholderDefault = 'email@example.com';
const emailPlaceholderError = 'email#example.com';
inputs.email.placeholder = emailPlaceholderDefault;

// Initialize aria-invalid and hide errors
Object.values(inputs).forEach(el => el.setAttribute('aria-invalid', 'false'));
queryRadios.forEach(radio => radio.setAttribute('aria-invalid', 'false'));
document.querySelectorAll('.field-error').forEach(err => err.classList.add('hidden'));

const errors = {
  firstName: document.getElementById('firstNameError'),
  lastName: document.getElementById('lastNameError'),
  email: document.getElementById('emailError'),
  message: document.getElementById('messageError'),
  consent: document.getElementById('consentError'),
  queryType: document.getElementById('queryTypeError')
};

const clearError = (name) => {
  const field = inputs[name] || null;
  const err = errors[name];
  if (err) err.classList.add('hidden');
  if (field) {
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('border-redPrimary', 'focus:ring-redPrimary', 'focus:border-redPrimary');
    field.classList.add('border-greyMid');
    if (name === 'email') {
      field.placeholder = emailPlaceholderDefault;
    }
  }
};

const setError = (name, message) => {
  const field = inputs[name] || null;
  const err = errors[name];
  if (err) {
    err.textContent = message;
    err.classList.remove('hidden');
  }
  if (field) {
    field.setAttribute('aria-invalid', 'true');
    field.classList.remove('border-greyMid');
    field.classList.add('border-redPrimary', 'focus:ring-redPrimary', 'focus:border-redPrimary');
    if (name === 'email') {
      field.placeholder = emailPlaceholderError;
    }
  }
};

Object.keys(inputs).forEach((key) => {
  inputs[key].addEventListener('input', () => clearError(key));
  if (inputs[key].type === 'checkbox') {
    inputs[key].addEventListener('change', () => clearError(key));
  }
});
queryRadios.forEach(radio => {
  radio.addEventListener('change', () => clearError('queryType'));
});

const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let firstInvalid = null;
  const radioChoice = document.querySelector('input[name="queryType"]:checked');

  if (!inputs.firstName.value.trim()) {
    setError('firstName', 'This field is required');
    firstInvalid = firstInvalid || inputs.firstName;
  }

  if (!inputs.lastName.value.trim()) {
    setError('lastName', 'This field is required');
    firstInvalid = firstInvalid || inputs.lastName;
  }

  if (!inputs.email.value.trim()) {
    setError('email', 'This field is required');
    firstInvalid = firstInvalid || inputs.email;
  } else if (!validateEmail(inputs.email.value.trim())) {
    setError('email', 'Please enter a valid email address');
    firstInvalid = firstInvalid || inputs.email;
  }

  if (!radioChoice) {
    errors.queryType.classList.remove('hidden');
    queryRadios.forEach(r => r.setAttribute('aria-invalid', 'true'));
    firstInvalid = firstInvalid || document.querySelector('input[name="queryType"]');
  } else {
    errors.queryType.classList.add('hidden');
    queryRadios.forEach(r => r.setAttribute('aria-invalid', 'false'));
  }

  if (!inputs.message.value.trim()) {
    setError('message', 'This field is required');
    firstInvalid = firstInvalid || inputs.message;
  }

  if (!inputs.consent.checked) {
    errors.consent.classList.remove('hidden');
    inputs.consent.setAttribute('aria-invalid', 'true');
    firstInvalid = firstInvalid || inputs.consent;
  } else {
    clearError('consent');
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // Success state
  toast.classList.remove('hidden');
  form.reset();
  document.querySelectorAll('.field-error').forEach(err => err.classList.add('hidden'));
  document.querySelectorAll('.field-input').forEach(inp => {
    inp.setAttribute('aria-invalid', 'false');
    inp.classList.remove('border-redPrimary', 'focus:ring-redPrimary', 'focus:border-redPrimary');
    inp.classList.add('border-greyMid');
  });
  inputs.email.placeholder = emailPlaceholderDefault;

  setTimeout(() => toast.classList.add('hidden'), 5000);
});
