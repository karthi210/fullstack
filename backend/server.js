const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy user
const user = {
  email: "admin@netflix.com",
  password: "1234"
};

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    return res.json({ success: true, message: "Login successful" });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

const PORT = 8002;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
