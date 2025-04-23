import { Request, Response } from 'express';
import { BlogService } from '../services/blogService';
import cloudinary from '../config/cloudinary';

export class BlogController {
  static async createBlog(req: Request, res: Response) {
    try {
      const {
        title, description, type, engine,
        description2, description3, description4, description5, tags
      } = req.body;

      const thumbnailFile = (req.files as any)?.thumbnail?.[0] || null;
      const thumbnail = thumbnailFile ? thumbnailFile.path : '';

      const photos = (req.files as any)?.photos || [];
      const videos = (req.files as any)?.videos || [];

      const blog = await BlogService.createBlog({
        type, engine, thumbnail, title, description,
        description2, description3, description4, description5, tags,
        photos: photos.map((photo: any) => ({
          title: photo.originalname,
          size: String(photo.size),
          description: 'Photo',
          url: photo.path
        })),
        videos: videos.map((video: any) => ({
          title: video.originalname,
          size: String(video.size),
          description: 'Video',
          url: video.path
        }))
      });

      res.status(201).json(blog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create blog' });
    }
  }

  static async getAllBlogs(req: Request, res: Response) {
    const blogs = await BlogService.getAllBlogs();
    res.json(blogs);
  }

  static async getBlogById(req: Request, res: Response ) {
    const blog = await BlogService.getBlogById(req.params.id);
    res.json(blog);
  }

  static async deleteBlog(req: Request, res: Response) {
    try {
      const blog = await BlogService.getBlogById(req.params.id);

      if (!blog) return res.status(404).json({ error: 'Blog not found' });

      const assetsToDelete = [
        blog.thumbnail,
        ...blog.photos.map(p => p.url),
        ...blog.videos.map(v => v.url)
      ].filter(Boolean);

      for (const assetUrl of assetsToDelete) {
        if (!assetUrl) continue;

        const filename = assetUrl.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`blog_assets/${publicId}`, {
              resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image'
            });
          } catch (e) {
            console.warn(`Failed to delete asset ${publicId}:`, e);
          }
        }
      }

      await BlogService.deleteBlog(String(req.params.id));
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete blog and its assets' });
    }
  }

  static async getLastAddedBlogs(req: Request, res: Response) {
    try {
      const lastAddedBlogs = await BlogService.getLastAddedBlogs();
      res.json(lastAddedBlogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get last added blogs' });
    }
  }
}
