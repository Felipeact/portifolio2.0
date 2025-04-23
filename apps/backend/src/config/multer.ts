import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'blog_assets';
    let resource_type = 'image';
    if (file.mimetype.startsWith('video')) {
      resource_type = 'video';
    }
    return {
      folder,
      format: file.mimetype.split('/')[1],
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type
    };
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov/;
  const ext = file.mimetype.split('/')[1];
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

export default upload;