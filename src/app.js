const express = require("express");
const connectDB = require("./config/database");
const app = express();
const { User } = require("./models/user");
const cookieParser = require("cookie-parser");

const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// app.get("/user", async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   console.log(user);
//   if (!user) {
//     res.status(404).send("User not found");
//   } else {
//     res.send(user);
//   }
// });

// app.get("/feed", async (req, res, next) => {
//   const users = await User.find();
//   if (!users.length) {
//     res.status(404).send("User not found");
//   } else {
//     res.send(users);
//   }
// });

// app.delete("/user", async (req, res) => {
//   const id = req.body.userId;
//   try {
//     // await User.findByIdAndDelete(id);
//     await User.findOneAndDelete({ _id: id });
//     res.send("User deleted succesfully!");
//   } catch (e) {
//     res.status(400).send("An error occurred");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const id = req.params.userId;
//   const data = req.body;
//   const { password } = req.body;
//   if (password) {
//   }

//   const ALLOWED_UPDATES = [
//     "userId",
//     "firstName",
//     "lastName",
//     "age",
//     "gender",
//     "skills",
//     "about",
//     "photoUrl",
//     "password",
//   ];

//   try {
//     const isAllowed = Object.keys(req.body).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isAllowed) {
//       throw new Error("Update not allowed");
//     }

//     if (data?.skills?.length > 10) {
//       throw new Error("Skills can't be more than 10");
//     }

//     await User.findByIdAndUpdate(id, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("User updated successfully");
//   } catch (e) {
//     res.status(400).send("UPDATE failed: " + e.message);
//   }
// });

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
