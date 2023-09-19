const jwt = require('jsonwebtoken');
const { User, Project } = require('../config/sequelize');
const jwtSecret = process.env.JWT_SECRET_KEY; // Load your JWT secret from environment variable
require('dotenv').config(); // Load environment variables from .env file

async function authenticateToken(req, res, next) {
  // Get the token from the request headers
  const authorizationHeader = req.header('Authorization');

  // Check if the token exists
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authorizationHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, jwtSecret, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the user associated with the token exists in the database
    try {
      const user = await User.findByPk(decodedToken.userId, {
        include: {
          model: Project,
        } // Load the projects association
      });


      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Attach the user object to the request for use in protected routes
      req.user = user;

      // If the request is for a PUT operation on a project, check if the user has access to that project
      if (req.method === 'PUT'  && req.params.projectId) {
        const project = await Project.findByPk(req.params.projectId);

        // Check if the user is associated with the project
        if (!project || !user.Projects || !user.Projects.some((p) => p.id === project.id)) {
          return res.status(403).json({ error: 'you does not have access to the project ' }); // User doesn't have access to the project
        }
      }
      req.userId = decodedToken.userId; // Assuming 'userId' is the key in your JWT payload

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

module.exports = {
  authenticateToken,
};
