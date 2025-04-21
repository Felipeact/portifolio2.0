import express from 'express';
import multer from 'multer';
import { BlogController } from '../controllers/blogController';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  BlogController.createBlog
);

router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);
router.delete('/:id', BlogController.deleteBlog);
router.get('/latest', BlogController.getLastAddedBlogs, );

export default router;
