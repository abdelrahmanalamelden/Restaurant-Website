const multer = require("multer");
const path = require("path");

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    console.log(file); // Log the file info for debugging
    const ext = file.mimetype.split("/")[1]; // Get file extension
    const name = `${Date.now()}-${Math.round(Math.random() * 100000)}.${ext}`;
    cb(null, name);
  },
});

// Initialize multer with the defined storage
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB (adjust as necessary)
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Export the upload middleware
module.exports = upload;
