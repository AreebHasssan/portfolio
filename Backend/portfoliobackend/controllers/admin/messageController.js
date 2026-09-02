const Message = require("../../model/admin/Message");

// Create Message (public)
exports.createMessage = async (req, res) => {
  try {
    const { name, contact, email, comment } = req.body;

    if (!name || !email || !comment) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email and comment are required",
        });
    }

    const message = await Message.create({ name, contact, email, comment });

    res
      .status(201)
      .json({
        success: true,
        message: "Message received",
        messageItem: message,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all messages (admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete message (admin)
exports.deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg)
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
