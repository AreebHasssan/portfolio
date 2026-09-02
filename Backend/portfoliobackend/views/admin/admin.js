const express = require("express");

const router = express.Router();

const {
  register,
  login,
  authMiddleware,
} = require("../../controllers/admin/adminc");

router.post("/register", register);
router.post("/login", login);

// Protected route to verify login
router.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
