import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = path.join(__dirname, "../db/users.json");

// Helper: Load users
const loadUsers = () => {
  if (!fs.existsSync(userDB)) fs.writeFileSync(userDB, "[]");
  return JSON.parse(fs.readFileSync(userDB));
};

// Helper: Save users
const saveUsers = (users) => {
  fs.writeFileSync(userDB, JSON.stringify(users, null, 2));
};

// POST /register
router.post("/register", async (req, res) => {
  console.log("➡️ POST /register hit");
  console.log("📥 Request body:", req.body);

  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const users = loadUsers();
    if (users.find((u) => u.email === email)) {
      console.log("⚠️ Email already exists");
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { fullName, email, password: hashedPassword };

    users.push(newUser);
    saveUsers(users);

    console.log("✅ User registered:", newUser);
    res.status(201).json({ message: "User registered" });

  } catch (err) {
    console.error("🔥 Server error during register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  res.json({
    message: "Login successful",
    user: { fullName: user.fullName, email: user.email },
  });
});

export default router;
