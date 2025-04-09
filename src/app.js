const express = require("express");
const connectDB = require("./config/database");
const app = express();
const { User } = require("./models/user");
const userAuth = require("./middlewares/auth"); // Import the auth middleware

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res, next) => {
  // await User.create(req.body);
  console.log(req.body);
  const user = new User(req?.body);

  try {
    await user.save();
    res.send(`New user ${user.firstName} created succesfully!`);
  } catch (err) {
    res
      .status(400)
      .send("An error occurred while creating new user " + err.message);
  }
});

app.get("/user", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

app.get("/feed", async (req, res, next) => {
  const users = await User.find();
  if (!users.length) {
    res.status(404).send("User not found");
  } else {
    res.send(users);
  }
});

app.delete("/user", async (req, res) => {
  const id = req.body.userId;
  try {
    // await User.findByIdAndDelete(id);
    await User.findOneAndDelete({ _id: id });
    res.send("User deleted succesfully!");
  } catch (e) {
    res.status(400).send("An error occurred");
  }
});

app.patch("/user", async (req, res) => {
  const id = req.body.userId;
  const data = req.body;

  const ALLOWED_UPDATES = [
    "userId",
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "about",
    "photoUrl",
  ];

  try {
    const isAllowed = Object.keys(req.body).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills can't be more than 10");
    }

    await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (e) {
    res.status(400).send("UPDATE failed: " + e.message);
  }
});

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
