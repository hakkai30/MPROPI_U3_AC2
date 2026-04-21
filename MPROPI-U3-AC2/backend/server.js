import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  LOGIN_MESSAGES,
  isStrongPassword,
  isValidEmail
} from "../shared/validation.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔧 Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Servir carpeta frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/shared", express.static(path.join(__dirname, "../shared")));

const USERS = [
  { email: "admin@test.com", password: "Admin123!" }
];

// 🔗 Ruta raíz → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: LOGIN_MESSAGES.requiredFields });
    }

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return res.status(400).json({ error: LOGIN_MESSAGES.requiredFields });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ error: LOGIN_MESSAGES.invalidEmail });
    }

    if (!isStrongPassword(normalizedPassword)) {
      return res.status(400).json({ error: LOGIN_MESSAGES.weakPassword });
    }

    const user = USERS.find(
      u => u.email === normalizedEmail && u.password === normalizedPassword
    );

    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    return res.status(200).json({
      success: true,
      message: "Connexion réussie."
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});