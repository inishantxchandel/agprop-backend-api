const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the authentication middleware

// Create a new user
router.post('/createuser',UserController.createUser);

// View user by ID
router.get('/usersByTechStack', UserController.getUsersByTechStack);

router.get('/viewuser/:userId', UserController.viewUser);

// Update user by ID
router.put('/updateuser',authenticateToken,UserController.updateUser);

// Delete user by ID
router.delete('/deleteuser',authenticateToken, UserController.deleteUser);


// List all users
router.get('/viewallusers', UserController.listUsers);





module.exports = router;
