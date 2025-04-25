const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, password, email } = req.body;
  if (!firstName && !lastName) {
    throw new Error("Please add a valid name.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }
};

module.exports = {
  validateSignupData,
};
