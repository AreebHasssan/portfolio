const express = require("express");

const router = express.Router();

const {
  addSkill,
  getSkills,
  deleteSkill,
  updateSkill,
} = require("../../controllers/admin/skillController");

const { authMiddleware } = require("../../controllers/admin/adminc");

// Secure endpoints for creation, modification, and deletion
router.post("/", authMiddleware, addSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

// Public endpoint for homepage to read skills
router.get("/", getSkills);

module.exports = router;
