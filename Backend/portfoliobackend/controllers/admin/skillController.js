const Skill = require("../../model/admin/Skill");

// Add Skill
exports.addSkill = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Skill.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Skill already exists",
      });
    }

    const skill = await Skill.create({ name });

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Skill
exports.updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

