const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: "Backend is running successfully 🚀" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
