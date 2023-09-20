const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProject = sequelize.define("UserProject", {});
  return UserProject;
};
