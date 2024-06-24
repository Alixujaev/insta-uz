import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  cloudinary,
  params: {
      folder: 'insta-uz',
      allowedFormats: ['jpeg', 'png', 'jpg'],
  }                                                              
}); 

export default storage