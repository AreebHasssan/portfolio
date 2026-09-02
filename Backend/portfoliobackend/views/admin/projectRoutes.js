const express = require("express");

const router = express.Router();

const {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} = require("../../controllers/admin/projectcontoller");

const { authMiddleware } = require("../../controllers/admin/adminc");

// Secure endpoints for creation, modification, and deletion
router.post("/", authMiddleware, addProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

// Public endpoint for homepage to read projects
router.get("/", getProjects);

module.exports = router;
