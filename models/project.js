// models/project.js

const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    projectTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    links: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    technicalStack: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });


  return Project;
};
