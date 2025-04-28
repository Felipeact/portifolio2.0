import { prisma } from '../prismaClient';
import cloudinary from '../config/cloudinary';

export class BlogService {
  static async createBlog(data: any) {
    return await prisma.blog.create({
      data: {
        ...data,
        photos: {
          create: data.photos.map((photo: any) => ({
            ...photo
          }))
        },
        videos: {
          create: data.videos.map((video: any) => ({
            ...video
          }))
        }
      },
      include: {
        photos: true,
        videos: true
      }
    });
  }

  static async getAllBlogs() {
    return prisma.blog.findMany({ include: { photos: true, videos: true } });
  }

  static async getLastAddedBlogs() {
    return prisma.blog.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { photos: true, videos: true }
    });
  }

  static async getBlogById(id: string) {
    return prisma.blog.findUnique({
      where: { id },
      include: { photos: true, videos: true }
    });
  }



  static async updateBlog(id: string, data: any) {
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
      include: { photos: true, videos: true }
    });
  
    if (!existingBlog) {
      throw new Error('Blog not found');
    }
  
    // Manage thumbnail
    const thumbnail = data.thumbnail ? data.thumbnail : existingBlog.thumbnail;
  
    // If no new photos/videos uploaded, keep old ones
    const photos = data.photos && data.photos.length > 0 ? data.photos : existingBlog.photos;
    const videos = data.videos && data.videos.length > 0 ? data.videos : existingBlog.videos;
  
    return prisma.blog.update({
      where: { id },
      data: {
        ...data,
        thumbnail,
        photos: {
          deleteMany: {}, // Always clear old because we'll re-create
          create: photos.map((photo: any) => ({
            title: photo.title,
            size: String(photo.size),
            description: photo.description || 'Photo',
            url: photo.url
          }))
        },
        videos: {
          deleteMany: {},
          create: videos.map((video: any) => ({
            title: video.title,
            size: String(video.size),
            description: video.description || 'Video',
            url: video.url
          }))
        }
      },
      include: {
        photos: true,
        videos: true
      }
    });
  }

  
  static async deleteBlog(id: string) {
    return prisma.blog.delete({ 
      where: { id },
      include: { photos: true, videos: true}
    });
  }
}
