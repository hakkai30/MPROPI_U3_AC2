export const LOGIN_MESSAGES = {
  requiredFields: "Veuillez remplir tous les champs.",
  invalidEmail: "Veuillez entrer une adresse email valide.",
  weakPassword: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

export function isStrongPassword(password) {
  return STRONG_PASSWORD_REGEX.test(password);
}

export function validateLogin(email, password) {
  const errors = [];

  if (!email) {
    errors.push(LOGIN_MESSAGES.requiredFields);
  } else if (!isValidEmail(email)) {
    errors.push(LOGIN_MESSAGES.invalidEmail);
  }

  if (!password) {
    errors.push(LOGIN_MESSAGES.requiredFields);
  } else if (!isStrongPassword(password)) {
    errors.push(LOGIN_MESSAGES.weakPassword);
  }

  return errors;
}