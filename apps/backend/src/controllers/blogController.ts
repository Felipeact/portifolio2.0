import { Request, Response } from 'express';
import { BlogService } from '../services/blogService';

export class BlogController {
  static async createBlog(req: Request, res: Response) {
    try {
      const {
        title, description, type, engine,
        description2, description3, description4, description5
      } = req.body;
      
      const thumbnailFile = (req.files as any)?.thumbnail?.[0] || null;
      const thumbnail = thumbnailFile ? thumbnailFile.path : '';

      // ✅ Ensure photos & videos are always arrays
      const photos = (req.files as any)?.photos?.[0] || null;
      const videos = (req.files as any)?.videos?.[0] || null;

      console.log('Received Data:', { title, description, type, engine, thumbnail });
      console.log('Uploaded Photos:', photos);
      console.log('Uploaded Videos:', videos);

      // ✅ Ensure map() does not run on undefined
      const blog = await BlogService.createBlog({
        type, engine, thumbnail, title, description,
        description2, description3, description4, description5,
        
        photos: photos ? [{
          title: photos.originalname,
          size: String(photos.size),
          description: 'Photo',
          url: photos.path,
          
        }] : [],
        videos: videos ? [{
          title: videos.originalname,
          size: String(photos.size),
          description: 'Video',
          url: videos.path,
        }] : []
      });

      res.status(201).json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create blog' });
    }
  }

  static async getAllBlogs(req: Request, res: Response) {
    const blogs = await BlogService.getAllBlogs();
    console.log(blogs)
    res.json(blogs);
  }

  static async getBlogById(req: Request, res: Response )
  {
     const blog = await BlogService.getBlogById(req.params.id);
     res.json(blog)
  }

  static async deleteBlog(req: Request, res: Response) {
    await BlogService.deleteBlog(String(req.params.id));
    res.sendStatus(204);
  }

  static async getLastAddedBlogs(req: Request, res: Response) {
    try {
      const lastAddedBlogs = await BlogService.getLastAddedBlogs();
      res.json(lastAddedBlogs); // ✅ return actual data
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get last added blogs' });
    }
  }
}
