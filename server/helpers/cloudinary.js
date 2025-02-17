require("dotenv").config(); // Secure API Keys
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

// 🔒 Secure Cloudinary credentials
cloudinary.config({
  cloud_name: "dpzxcxyqv",
  api_key: "379395625323433",
  api_secret: "w-urcZ7KYnzH3DLsrC9VnTLdx6o",
});

// ✅ Multer Setup (Memory Storage for Direct Uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Upload a single image buffer to Cloudinary
async function uploadSingleImage(fileBuffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url); // Return secure URL only
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

// ✅ Upload multiple images
async function uploadMultipleImages(files) {
  return Promise.all(files.map((file) => uploadSingleImage(file.buffer)));
}

module.exports = { upload, uploadMultipleImages };



