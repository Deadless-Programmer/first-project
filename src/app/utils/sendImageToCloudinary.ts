import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config'; // Adjust the path if needed

// Step 1: Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// Step 2: Function to upload to Cloudinary
export const sendImageToCloudinary = (
  imageName: string,
  path: string
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        // Always try to delete the local file
        fs.unlink(path, (err) => {
          if (err) {
            console.error('File deletion error:', err);
          } else {
            console.log('File is deleted.');
          }
        });

        // Handle Cloudinary errors
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }

        // Success case
        resolve(result as UploadApiResponse);
      }
    );
  });
};

// Step 3: Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/'); // Ensure folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

// Step 4: Export Multer Upload Middleware
export const upload = multer({ storage: storage });
