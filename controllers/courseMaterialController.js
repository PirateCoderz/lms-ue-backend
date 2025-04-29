const multer = require('multer');
const path = require('path');
const { materials } = require("../models/materials");

// Set up multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/materials/'); // Files will be uploaded to 'public/courseMaterials' folder
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Create a new course material with file upload
exports.createMaterial = async (req, res) => {
  try {
    // Handle file upload
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ message: "Error uploading file", error: err });
      }

      // Get the material data from the body and file
      const { fileName, course, teacherId } = req.body;
      console.log(req.body)
      const materialFile = req.file;

      // Check if file is uploaded
      if (!materialFile) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      // Create new material with uploaded file data
      const materialData = {
        course,
        fileName: fileName || materialFile.filename, // Store the uploaded file name
        link: `/materials/${materialFile.filename}`, // Store the relative file path
        teacherId,
      };

      // Create the new material and save it
      const material = new materials(materialData);
      await material.save();

      res.send({
        data: material,
        message: "Course Material Created Successfully",
      });
    });
  } catch (error) {
    console.error("Error creating course material:", error);
    res.status(500).send({ message: "Error creating course material" });
  }
};

// Get all materials for a teacher by teacherId
exports.getMaterialsByTeacher = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const materialsList = await materials.find({ teacherId });

    res.send(materialsList);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).send({ message: "Error fetching course materials" });
  }
};

// Get materials by course name
exports.getMaterialsByCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const materialsList = await materials.find({ course });

    res.send(materialsList);
  } catch (error) {
    console.error("Error fetching materials by course:", error);
    res.status(500).send({ message: "Error fetching materials by course" });
  }
};

// Get a specific course material by its ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await materials.findById(req.params.id);
    if (!material) {
      return res.status(404).send({ message: "Course material not found" });
    }
    res.send(material);
  } catch (error) {
    console.error("Error fetching material:", error);
    res.status(500).send({ message: "Error fetching course material" });
  }
};

// Delete a course material by its ID
exports.deleteMaterialById = async (req, res) => {
  try {
    const material = await materials.findByIdAndDelete(req.params.id);
    if (!material) {
      return res.status(404).send({ message: "Course material not found" });
    }
    res.send({ message: "Course material deleted successfully" });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).send({ message: "Error deleting course material" });
  }
};

// Update a course material by its ID
exports.updateMaterialById = async (req, res) => {
  try {
    const updatedMaterial = await materials.findByIdAndUpdate(
      req.params.id,
      req.body, // Update with provided data
      { new: true, runValidators: true }
    );
    if (!updatedMaterial) {
      return res.status(404).send({ message: "Course material not found" });
    }

    // Check if a new file is uploaded
    if (req.file) {
      updatedMaterial.fileName = req.file.filename;
      updatedMaterial.link = `/courseMaterials/${req.file.filename}`;
    }

    await updatedMaterial.save();
    res.send({
      data: updatedMaterial,
      message: "Course material updated successfully",
    });
  } catch (error) {
    console.error("Error updating material:", error);
    res.status(500).send({ message: "Error updating course material" });
  }
};
