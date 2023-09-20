// config/sequelize.js
const { Sequelize } = require("sequelize");
const UserModel = require("../models/user");
const ProjectModel = require("../models/project");
const UserProjectModel = require("../models/user_project"); // Import the UserProject model

require("dotenv").config(); // Load environment variables from .env file

const sequelize = new Sequelize({
  dialect: "postgres", // Use 'postgres' for PostgreSQL
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL/TLS
      rejectUnauthorized: false,
    },
  },
});

const User = UserModel(sequelize);
const Project = ProjectModel(sequelize);
const UserProject = UserProjectModel(sequelize); // Initialize the UserProject model

User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });
module.exports = { sequelize, User, Project };
