const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth");

router.get("/profile", userAuth, async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new Error("User not present in the DB");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = router;
