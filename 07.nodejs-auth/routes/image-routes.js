const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');
const uploadImageController = require('../controllers/image-controller');

// upload image
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImageController.uploadImage);

// get all images
router.get('/get', authMiddleware, uploadImageController.fetchAllImages);

// delete image (admins can delete any, users can delete their own)
router.delete('/delete/:id', authMiddleware, adminMiddleware, uploadImageController.deleteImage);

module.exports = router;