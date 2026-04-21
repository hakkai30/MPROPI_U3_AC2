import { validateLogin } from "../shared/validation.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("message");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const errors = validateLogin(email, password);
  if (errors.length > 0) {
    message.textContent = errors[0];
    return;
  }

  try {
    const data = await login(email, password);

    message.textContent = data.success
      ? "Connexion réussie."
      : data.error || "Une erreur est survenue.";
  } catch (error) {
    message.textContent = "Impossible de se connecter au serveur.";
  }
});

async function login(email, password) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}