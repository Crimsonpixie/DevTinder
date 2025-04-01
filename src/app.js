const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const authMiddleware = require("./middlewares/auth"); // Import the auth middleware

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", authMiddleware, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get user by email

app.get("/user", [
  (req, res, next) => {
    next();
    console.log("Middleware called");
    res.send({
      message: "User not found",
    });
    next();
  },
  (req, res, next) => {
    console.log("Second middleware called");
  },
  (req, res, next) => {
    console.log("Third middleware called");
  },
]);

connectDB()
  .then(() => {
    console.log("Database connection established successfully!");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Error:", err);
  });
