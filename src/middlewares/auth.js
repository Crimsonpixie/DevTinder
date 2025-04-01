const authMiddleware = (req, res, next) => {
  const isAuthenticated = true;
  if (isAuthenticated) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Unauthorized" }); // User is not authenticated, send an error response
  }
};

module.exports = authMiddleware;
