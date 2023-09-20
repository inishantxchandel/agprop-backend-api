const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projects');
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the authentication middleware

// Create a new project
router.post('/createproject',authenticateToken,ProjectController.createProject);

// View project by tech stack
router.get('/projectsByTechStack', ProjectController.getProjectsByTechStack);

// View project by ID
router.get('/viewproject/:projectId',ProjectController.viewProject);

// Update project by ID
router.put('/updateproject/:projectId',authenticateToken,  ProjectController.updateProject);

// Delete project by ID
router.delete('/deleteproject/:projectId',authenticateToken, ProjectController.deleteProject);

// List all projects
router.get('/viewallprojects', ProjectController.listProjects);


module.exports = router;
