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

  
  static async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await BlogService.getBlogById(String(id));
  
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      const {
        title, description, type, engine,
        description2, description3, description4, description5, tags
      } = req.body;
  
      const thumbnailFile = (req.files as any)?.thumbnail?.[0] ?? null;
      const photos = (req.files as any)?.photos ?? [];
      const videos = (req.files as any)?.videos ?? [];
  
      let uploadedThumbnail = blog.thumbnail;
      let uploadedPhotos = blog.photos;
      let uploadedVideos = blog.videos;
  
      // === Handle Thumbnail ===
      if (thumbnailFile?.path) {
        const oldThumbFilename = blog.thumbnail?.split('/').pop() ?? '';
        const oldThumbPublicId = oldThumbFilename.substring(0, oldThumbFilename.lastIndexOf('.'));
  
        if (oldThumbPublicId) {
          try {
            await cloudinary.uploader.destroy(`blog_assets/${oldThumbPublicId}`, {
              resource_type: 'image',
            });
          } catch (e) {
            console.warn(`Failed to delete old thumbnail ${oldThumbPublicId}:`, e);
          }
        }
  
        const uploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
          folder: 'blog_assets',
          resource_type: 'image',
        });
  
        uploadedThumbnail = uploadResult.secure_url;
      }
  
      // === Handle New Photos ===
      if (photos.length > 0 && blog.photos.length > 0) {
        for (const oldPhoto of blog.photos) {
          const filename = oldPhoto.url.split('/').pop() ?? '';
          const publicId = filename.substring(0, filename.lastIndexOf('.'));
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(`blog_assets/${publicId}`, {
                resource_type: 'image',
              });
            } catch (e) {
              console.warn(`Failed to delete old photo ${publicId}:`, e);
            }
          }
        }
      }
  
      if (photos.length > 0) {
        uploadedPhotos = await Promise.all(
          photos.map(async (photo: any) => {
            const uploadResult = await cloudinary.uploader.upload(photo.path, {
              folder: 'blog_assets',
              resource_type: 'image',
            });
  
            return {
              title: photo.originalname,
              size: String(photo.size),
              description: 'Photo',
              url: uploadResult.secure_url,
            };
          })
        );
      }
  
      // === Handle New Videos ===
      if (videos.length > 0 && blog.videos.length > 0) {
        for (const oldVideo of blog.videos) {
          const filename = oldVideo.url.split('/').pop() ?? '';
          const publicId = filename.substring(0, filename.lastIndexOf('.'));
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(`blog_assets/${publicId}`, {
                resource_type: 'video',
              });
            } catch (e) {
              console.warn(`Failed to delete old video ${publicId}:`, e);
            }
          }
        }
      }
  
      if (videos.length > 0) {
        uploadedVideos = await Promise.all(
          videos.map(async (video: any) => {
            const uploadResult = await cloudinary.uploader.upload(video.path, {
              folder: 'blog_assets',
              resource_type: 'video',
            });
  
            return {
              title: video.originalname,
              size: String(video.size),
              description: 'Video',
              url: uploadResult.secure_url,
            };
          })
        );
      }
  
      // === Call BlogService to update blog and replace media records ===
      const updatedBlog = await BlogService.updateBlog(String(id), {
        type,
        engine,
        thumbnail: uploadedThumbnail,
        title,
        description,
        description2,
        description3,
        description4,
        description5,
        tags,
        photos: uploadedPhotos,
        videos: uploadedVideos,
      });
  
      res.status(200).json(updatedBlog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  }
  static async deleteBlog(req: Request, res: Response) {
    try {
      const blog = await BlogService.getBlogById(req.params.id);
  
      if (!blog) return res.status(404).json({ error: 'Blog not found' });
  
      const assetsToDelete = [
        blog.thumbnail,
        ...blog.photos.map(p => p.url),
        ...blog.videos.map(v => v.url),
      ].filter(Boolean);
  
      for (const assetUrl of assetsToDelete) {
        if (!assetUrl) continue;
  
        const filename = assetUrl.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));
  
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`blog_assets/${publicId}`, {
              resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image',
            });
          } catch (e) {
            console.warn(`Failed to delete asset ${publicId}:`, e);
          }
        }
      }
  
      await BlogService.deleteBlogAssets(req.params.id); // << add this
      await BlogService.deleteBlog(req.params.id);
  
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
