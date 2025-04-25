const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth");

router.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new Error("User not present in the DB");
    }
    res.send(`${user.firstName} sent the connection request.`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = router;
