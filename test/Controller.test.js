// Import necessary modules and setup
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const user = require("../models/user");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Controller", () => {
  let userId;
  let authToken;
  let projectId;
  describe("POST /api/createuser", () => {
    it("should create a new user", (done) => {
      const newUser = {
        fullName: "John Doe",
        email: "johnnndookkoe@example.com",
        bio: "A test user",
        city: "Test City",
        state: "TS",
        country: "Test Country",
      };

      chai
        .request(app)
        .post("/api/createuser")
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("newUser");
          expect(res.body).to.have.property("token");
          authToken = res.body.token;
          userId = res.body.newUser.id;

          done();
        });
    });

    it("should return an error for incomplete data", (done) => {
      const incompleteUser = {
        email: "incompleteeee@example.com",
      };

      chai
        .request(app)
        .post("/api/createuser")
        .send(incompleteUser)
        .end((err, res) => {
          expect(res).to.have.status(400);

          done();
        });
    });
  });

  describe("GET /api/viewuser/:userId", () => {
    it("should retrieve a user by ID", (done) => {
      chai
        .request(app)
        .get(`/api/viewuser/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("fullName");
          expect(res.body).to.have.property("email");
          done();
        });
    });

    it("should return an error for a non-existent user", (done) => {
      const userId = 999;

      chai
        .request(app)
        .get(`/api/viewuser/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });
  });
  describe("PUT /api/updateuser", () => {
    it("should update a user", (done) => {
      const updatedUser = {
        fullName: "John Doe",
        email: "hhhhhhh@gmail.com",
        bio: "A test user",
        city: "Test City",
        state: "TS",
        country: "Test Country",
      };
      chai
        .request(app)
        .put("/api/updateuser")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message");
        });
      done();
    });
    it("should return an error for incomplete data", (done) => {
      const incompleteUser = {
        email: "hhhhhh@gmail.com",
      };
      chai
        .request(app)
        .put("/api/updateuser")
        .set("Authorization", `Bearer ${authToken}`)
        .send(incompleteUser)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
      done();
    });
  });
  describe("GET /api/viewallusers", () => {
    it("should retrieve all users", (done) => {
      chai
        .request(app)
        .get("/api/viewallusers")
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
      done();
    });
  });
  describe("POST /api/createproject", () => {
    it("should create a new project", (done) => {
      const newProject = {
        projectData: {
          projectTitle: "My Awesome Project",
          description: "This is a test project",
          links: ["https://example.com"],
          technicalStack: ["JavaScript", "Node.js", "Go Lang"],
        },
        userIds: [], // Replace with valid user IDs from your database
      };

      chai
        .request(app)
        .post("/api/createproject")
        .set("Authorization", `Bearer ${authToken}`)
        .send(newProject)
        .end((err, res) => {
          expect(res).to.have.status(201);
          // Add more assertions as needed

          projectId = res.body.id;

          done();
        });
    });

    // Add more test cases for project creation as needed
  });
  describe("GET /api/viewproject/:projectId", () => {
    it("should retrieve a project by ID", (done) => {
      chai
        .request(app)
        .get(`/api/viewproject/${projectId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    // Add more test cases for project retrieval as needed
  });
  {
    /*
 describe("PUT /api/updateproject/:projectId", () => {
    it("should update a project", (done) => {
      const updatedProject = {
        "projectTitle": "My Awesome Project",
        "description": "This is a description of my awesome project.",
        "links": [
          "https://github.com/myusername/myproject",
          "https://myprojectwebsite.com"
        ],
        "technicalStack": ["Node.js", "Express.js", "React"]
      };
      chai
        .request(app)
        .put(`/api/updateproject/${projectId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(updatedProject)
        .end((err, res) => {
          expect(res).to.have.status(200);
          // Add more assertions as needed

          done();
        });
    });

    // Add more test cases for project update as needed
  }); */
  }
  describe("GET /api/viewallprojects", () => {
    it("should retrieve all projects", (done) => {
      chai
        .request(app)
        .get("/api/viewallprojects")
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });
  describe("GET /api/projectsbytechstack", () => {
    it("should retrieve all projects by tech stack", (done) => {
      chai
        .request(app)
        .get("/api/projectsByTechStack")
        .query({ techStack: "Node.js" })
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
    describe("GET /api/usersByTechStack", () => {
      it("should retrieve all users by tech stack", (done) => {
        chai
          .request(app)
          .get("/api/usersByTechStack")
          .query({ techStack: "Node.js" })
          .end((err, res) => {
            expect(res).to.have.status(200);

            done();
          });
      });
    });
  });
  describe("DELETE /api/deleteproject/:projectId", () => {
    it("should delete a project", (done) => {
      chai
        .request(app)
        .delete(`/api/deleteproject/${projectId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });

  describe("DELETE /api/deleteuser", () => {
    it("should delete a user", (done) => {
      chai
        .request(app)
        .delete("/api/deleteuser")
        .set("Authorization", `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("message");
        });
      done();
    });
  });
});
