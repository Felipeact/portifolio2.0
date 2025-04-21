import { prisma } from '../prismaClient';

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

  static async deleteBlog(id: string) {
    return prisma.blog.delete({ 
      where: { id },
      include: { photos: true, videos: true}
    });
  }
}
