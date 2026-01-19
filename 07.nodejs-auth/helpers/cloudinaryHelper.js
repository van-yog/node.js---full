const cloudinary = require('../config/claudinary');

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { uploadToCloudinary, deleteFromCloudinary };