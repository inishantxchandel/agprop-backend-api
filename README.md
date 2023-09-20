# Project Name

Project Description

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- Node.js installed
- Postman (for testing the API)

### Installing

1. Clone the project repository from GitHub:

   ```bash
   git clone https://github.com/inishantxchandel/agprop-backend-api.git
   cd agprop-backend-api
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Set up Environment Variables:

   Create a `.env` file in the project root directory and add the following environment variables:

   ```
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_NAME=your-database-name
   DB_PASS=your-database-password
   JWT_SECRET_KEY=your-secret-key
   ```

### Running the Application

1. Start the server:

   ```bash
   npx nodemon server.js
   ```

   This will start the Express.js server.

2. Your server will be running at `http://localhost:3000`.

## API Documentation

### Authentication

To access authenticated routes, you need to obtain an authentication token by creating a user.

Use the following endpoint:

**Create User:**

```http
POST http://localhost:3000/api/createuser
```

Request Body (example):

```json
{
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "bio": "A software developer",
  "city": "New York",
  "state": "NY",
  "country": "USA"
}
```

The response will include a token that you can use for authenticated routes.

### User Routes

For routes that require authentication, make sure to add the token to the Authorization Bearer field in your request headers.

- **View User by ID:**

  ```http
  GET http://localhost:3000/api/viewuser/:userId
  ```

- **Update User (requires authentication):**

  ```http
  PUT http://localhost:3000/api/updateuser
  ```

  Request Body (example):

  ```json
  {
    "fullName": "Updated Name",
    "email": "updatedemail@example.com",
    "bio": "Updated bio",
    "city": "Updated City",
    "state": "Updated State",
    "country": "Updated Country"
  }
  ```

- **Delete User (requires authentication):**

  ```http
  DELETE http://localhost:3000/api/deleteuser
  ```

- **List All Users:**

  ```http
  GET http://localhost:3000/api/viewallusers
  ```

  - **List All Users where X technical stack used:**

  ```http
  GET http://localhost:3000/api/usersByTechStack?techStack=JavaScript
  ```

### Project Routes

- **Create Project (requires authentication):**

  ```http
  POST http://localhost:3000/api/createproject
  ```

  Request Body (example):

  ```json
  {
    "projectData": {
      "projectTitle": "My Awesome Project",
      "description": "This is a test project",
      "links": ["https://example.com"],
      "technicalStack": ["JavaScript", "Node.js", "Go Lang"]
    },
    "userIds": [] // For a group project add valid user id's otherwise leave it blank
  }
  ```

- **View Project by ID:**

  ```http
  GET http://localhost:3000/api/viewproject/:projectId
  ```

- **Update Project by ID (requires authentication):**

  ```http
  PUT http://localhost:3000/api/updateproject/:projectId
  ```

  Request Body (example):

  ```json
  {
    "projectTitle": "Updated Title",
    "description": "Updated Description",
    "links": ["updated-link1", "updated-link2"],
    "technicalStack": ["Updated Tech Stack 1", "Updated Tech Stack 2"]
  }
  ```

- **Delete Project by ID (requires authentication):**

  ```http
  DELETE http://localhost:3000/api/deleteproject/:projectId
  ```

- **List All Projects:**

  ```http
  GET http://localhost:3000/api/viewallprojects
  ```

- **List All Users where X technical stack used:**

```http
GET http://localhost:3000/api/projectsByTechStack?techStack=JavaScript
```
