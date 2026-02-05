const express = require("express");
const path = require("path");

const app = express();
const PORT = 8000;

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Backend is running successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
