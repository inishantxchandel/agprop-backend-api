const { Project,User } = require('../config/sequelize');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize'); // Import Sequelize

// Create a new user
require('dotenv').config(); // Load environment variables from .env file

const jwtSecret = process.env.JWT_SECRET_KEY; // Load your JWT secret from environment variable

const createUser = async (req, res) => {
  try {
    // Validate req.body
    const { fullName, email, bio, city, state, country } = req.body;
    
    // Check for required fields (fullName and email)
    if (!fullName || !email) {
      return res.status(400).json({ error: 'Full name and email are required fields.' });
    }

    // Validate email format (you can use a regular expression or a library like validator.js)
    // For example, a basic email format check:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Create a new user
    const newUser = await User.create({
      fullName,
      email,
      bio,
      city,
      state,
      country,
    });

    // Generate a JWT token for the newly created user
    const token = jwt.sign({ userId: newUser.id }, jwtSecret, {
      expiresIn: '24h',
    });

    res.status(201).json({ newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create user.' });
  }
};

// View user by ID
const viewUser = async (req, res) => {

  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch user.' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const userId = req.userId;
  const { fullName, email, bio, city, state, country } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: 'Full name and email are required fields.' });
  }

  // Validate email format (you can use a regular expression or a library like validator.js)
  // For example, a basic email format check:
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }



  try {
    const [updatedRows] = await User.update(req.body, {
      where: { id: userId },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(200).json({ message: 'User updated successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update user.' });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const userId = req.userId;
  try {
    const deletedRows = await User.destroy({
      where: { id: userId },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(200).json({ message: 'User deleted successfully.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete user.' });
  }
};

// List all users
const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch users.' });
  }
};

const getUsersByTechStack = async (req, res) => {
  const techStack = req.query.techStack;
  try {
    const users = await User.findAll({
      include: {
        model: Project,
        where: {
          technicalStack: {
            [Sequelize.Op.contains]: [techStack], // Assuming technicalStack is an array field
          },
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch users by tech stack.' });
  }
};

module.exports = {
  createUser,
  viewUser,
  updateUser,
  deleteUser,
  listUsers,
  getUsersByTechStack
};
