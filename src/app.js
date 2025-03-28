const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to parse JSON
app.use("/test", (req, res) => {
  res.send("Hello World");
});
// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
