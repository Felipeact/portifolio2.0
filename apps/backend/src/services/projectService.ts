import { prisma } from '../prismaClient';

export class ProjectService {
  static async createProject(data: any) {
    return await prisma.project.create({
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

  static async getAllProjects() {
    return prisma.project.findMany({ include: { photos: true, videos: true } });
  }

  static async getLastAddedProjects() {
    return prisma.project.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { photos: true, videos: true }
    });
  }

  static async getProjectById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: { photos: true, videos: true }
    });
  }



  static async updateProject(id: string, data: any) {
    const existingproject = await prisma.project.findUnique({
      where: { id },
      include: { photos: true, videos: true }
    });
  
    if (!existingproject) {
      throw new Error('project not found');
    }
  
    // Manage thumbnail
    const thumbnail = data.thumbnail ? data.thumbnail : existingproject.thumbnail;
  
    // If no new photos/videos uploaded, keep old ones
    const photos = data.photos && data.photos.length > 0 ? data.photos : existingproject.photos;
    const videos = data.videos && data.videos.length > 0 ? data.videos : existingproject.videos;
  
    return prisma.project.update({
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

  
  static async deleteProject(id: string) {
    return prisma.project.delete({ 
      where: { id },
      include: { photos: true, videos: true}
    });
  }
}
