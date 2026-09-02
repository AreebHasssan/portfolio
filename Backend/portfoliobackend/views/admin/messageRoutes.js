const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../../controllers/admin/adminc");
const {
  createMessage,
  getMessages,
  deleteMessage,
} = require("../../controllers/admin/messageController");

// Public endpoint to create a message
router.post("/", createMessage);

// Admin-only endpoints
router.get("/", authMiddleware, getMessages);
router.delete("/:id", authMiddleware, deleteMessage);

module.exports = router;
