const { Project, User } = require("../config/sequelize");
const { Sequelize } = require("sequelize"); // Import Sequelize

const createProject = async (req, res) => {
  try {
    const { userIds, projectData } = req.body;
    const currUser = req.user;

    // Retrieve the users by their IDs
    const users = await User.findAll({
      where: {
        id: userIds,
      },
    });

    // Create the project
    const newProject = await Project.create(projectData);

    newProject.addUser(currUser);

    // Associate users with the project by creating entries in the join table UserProject
    if (users.length > 0)
      await Promise.all(users.map((user) => newProject.addUser(user)));

    res.status(201).json(newProject); // Return the created project
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create project." });
  }
};

// View project by ID
const viewProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ error: "Project not found." });
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch project." });
  }
};

// Update project by ID
const updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const [updatedRows] = await Project.update(req.body, {
      where: { id: projectId },
    });
    if (updatedRows === 0) {
      res.status(404).json({ error: "Project not found." });
    } else {
      res.status(200).json({ message: "Project updated successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update project." });
  }
};

// Delete project by ID
const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const deletedRows = await Project.destroy({
      where: { id: projectId },
    });
    if (deletedRows === 0) {
      res.status(404).json({ error: "Project not found." });
    } else {
      res.status(200).json({ message: "Project deleted successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete project." });
  }
};

// List all projects
const listProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch projects." });
  }
};
// View project by tech stack
const getProjectsByTechStack = async (req, res) => {
  const techStack = req.query.techStack;
  try {
    const projects = await Project.findAll({
      where: {
        technicalStack: {
          [Sequelize.Op.contains]: [techStack], // Check if techStack is in the array
        },
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch projects by tech stack." });
  }
};

module.exports = {
  createProject,
  viewProject,
  updateProject,
  deleteProject,
  listProjects,
  getProjectsByTechStack,
};
