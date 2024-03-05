// Import JWT_SECRET from the configuration file
const { JWT_SECRET } = require("../config");
// Import the 'jsonwebtoken' library
const jwt = require("jsonwebtoken");

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  // Extract the 'Authorization' header from the request
  const authHeader = req.headers.authorization;

  // Check if the 'Authorization' header is missing or does not start with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If missing or incorrect, return a 403 Forbidden response with an empty JSON object
    return res.status(403).json({});
  }

  // Extract the token from the 'Authorization' header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the user ID from the decoded token to the request object
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error during token verification, return a 403 Forbidden response with an empty JSON object
    return res.status(403).json({});
  }
};

// Export the authentication middleware for use in other parts of the application
module.exports = {
  authMiddleware,
};
