const mongoose = require('mongoose');
const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../helpers/cloudinaryHelper');

const uploadImage = async (req, res) => {
  try {
    // check if file is missing
    if (!req.file) {
      return res.status(400).json({ message: "File is missing. Please upload a file." });
    }
    // upload file to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image in the database
    const newlyUploadedImage = await Image.create({ url, publicId, uploadedBy: req.userInfo.userId });

    res.status(201).json({ message: "Image uploaded successfully", image: newlyUploadedImage });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const fetchAllImages = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {}
    sortObj[sortBy] = sortOrder;

    const images = await Image.find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ message: "Images fetched successfully", totalImages, totalPages, currentPage: page, data: images });

  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    let image;

    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Find by MongoDB _id
      image = await Image.findById(id);
    } else {
      // If not valid ObjectId, try to find by Cloudinary publicId
      image = await Image.findOne({ publicId: id });
    }

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Check if user has permission (only admin or the user who uploaded it)
    const userId = req.userInfo.userId;
    const userRole = req.userInfo.role;

    if (userRole !== 'admin' && image.uploadedBy.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden. You can only delete your own images." });
    }

    // Delete image from Cloudinary
    await deleteFromCloudinary(image.publicId);

    // Delete image from database
    await Image.findByIdAndDelete(image._id);

    res.status(200).json({ message: "Image deleted successfully" });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { uploadImage, fetchAllImages, deleteImage };