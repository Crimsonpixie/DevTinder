const userAuth = (req, res, next) => {
  console.log("User authentication middleware called");
  const token = "xyz";
  const isAuthenticated = token === "xyz"; // Simulate token verification
  if (isAuthenticated) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Unauthorized Request" }); // User is not authenticated, send an error response
  }
};

module.exports = userAuth;
