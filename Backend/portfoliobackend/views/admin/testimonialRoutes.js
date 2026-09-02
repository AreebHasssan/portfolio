const express = require("express");
const router = express.Router();

const { upload } = require("../../config/cloudinary");
const { authMiddleware } = require("../../controllers/admin/adminc");

const {
  addTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
} = require("../../controllers/admin/testimonialController");

// Secure endpoints for creation, modification, and deletion
router.post("/", authMiddleware, upload.single("image"), addTestimonial);
router.put("/:id", authMiddleware, upload.single("image"), updateTestimonial);
router.delete("/:id", authMiddleware, deleteTestimonial);

// Public endpoint for homepage to read testimonials
router.get("/", getTestimonials);

module.exports = router;
