const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize, User, Project } = require("./config/sequelize");
const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Logging for development

// Routes
app.use("/api", usersRoutes);
app.use("/api", projectsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sync models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced successfully.");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing the database:", error);
  });
