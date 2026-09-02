const Testimonial = require("../../model/admin/Testimonial");
const { imageUploadUtil } = require("../../config/cloudinary");

// Add Testimonial
exports.addTestimonial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const uploadResult = await imageUploadUtil(req.file.buffer);

    const testimonial = await Testimonial.create({
      image: uploadResult.secure_url,
      name: req.body.name || "Anonymous",
      message: req.body.message,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      testimonial,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const updateData = { message: req.body.message };

    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.file) {
      const uploadResult = await imageUploadUtil(req.file.buffer);
      updateData.image = uploadResult.secure_url;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
