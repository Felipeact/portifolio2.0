import express from 'express';
import upload from '../config/multer';
import { BlogController } from '../controllers/blogController';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  BlogController.createBlog
);

router.get('/', BlogController.getAllBlogs);
router.get('/latest', BlogController.getLastAddedBlogs);
router.get('/:id', BlogController.getBlogById);
router.delete('/:id', async (req, res) => {
  try {
    await BlogController.deleteBlog(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});


export default router;
