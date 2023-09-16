const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads',
      format: async (req, file) => {
        // Only allow images
        if (!file.mimetype.startsWith('image')) {
          return Promise.reject(new Error('Not an image'));
        }
        return 'png'; // supports promises as well
      },
      public_id: (req, file) => `${file.originalname}-${Date.now()}`,
    },
  });
  

  module.exports = { cloudinary, storage };
