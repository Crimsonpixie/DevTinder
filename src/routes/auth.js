const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const { User } = require("../models/user");

router.post("/signup", async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    validateSignupData(req);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    }); // New User model instance
    await user.save();
    res.send(`New user ${user.firstName} created succesfully!`);
  } catch (err) {
    res.status(400).send("SIGNUP failed: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid || !user) {
      throw new Error("Wrong credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful!!!");
    }
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = router;
