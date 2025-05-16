import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';
import cloudinary from '../config/cloudinary';

export class ProjectController {
  static async createProject(req: Request, res: Response) {
    try {
      const {
        title, description, type, engine,
        description2, description3, description4, description5, tags
      } = req.body;

      const thumbnailFile = (req.files as any)?.thumbnail?.[0] || null;
      const thumbnail = thumbnailFile ? thumbnailFile.path : '';

      const photos = (req.files as any)?.photos || [];
      const videos = (req.files as any)?.videos || [];

      const project = await ProjectService.createProject({
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

      res.status(201).json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }

  static async getAllProjects(req: Request, res: Response) {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
  }

  static async getProjectById(req: Request, res: Response ) {
    const project = await ProjectService.getProjectById(req.params.id);
    res.json(project);
  }

  
static async updateProject(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(String(id));

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return; // Return early, not assigning any response to the function result
    }

    const {
      title, description, type, engine,
      description2, description3, description4, description5, tags
    } = req.body;

    const thumbnailFile = (req.files as any)?.thumbnail?.[0] ?? null;
    const photos = (req.files as any)?.photos ?? [];
    const videos = (req.files as any)?.videos ?? [];

    let uploadedThumbnail = project.thumbnail;
    let uploadedPhotos = project.photos;
    let uploadedVideos = project.videos;

    // === Handle Thumbnail ===
    if (thumbnailFile?.path) {
      const oldThumbFilename = project.thumbnail?.split('/').pop() ?? '';
      const oldThumbPublicId = oldThumbFilename.substring(0, oldThumbFilename.lastIndexOf('.'));

      if (oldThumbPublicId) {
        try {
          await cloudinary.uploader.destroy(`projects_assets/${oldThumbPublicId}`, {
            resource_type: 'image',
          });
        } catch (e) {
          console.warn(`Failed to delete old thumbnail ${oldThumbPublicId}:`, e);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
        folder: 'projects_assets',
        resource_type: 'image',
      });

      uploadedThumbnail = uploadResult.secure_url;
    }

    // === Handle New Photos ===
    if (photos.length > 0 && project.photos.length > 0) {
      for (const oldPhoto of project.photos) {
        if (!oldPhoto.url) {
          console.warn('Old photo URL is missing.');
          continue; // Skip this photo if the URL is missing
        }

        const filename = oldPhoto.url.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`projects_assets/${publicId}`, {
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
            folder: 'projects_assets',
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
    if (videos.length > 0 && project.videos.length > 0) {
      for (const oldVideo of project.videos) {
        if (!oldVideo.url) {
          console.warn('Old video URL is missing.');
          continue; // Skip this video if the URL is missing
        }

        const filename = oldVideo.url.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`projects_assets/${publicId}`, {
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
            folder: 'projects_assets',
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

    // === Call ProjectService to update project and replace media records ===
    const updatedProject = await ProjectService.updateProject(String(id), {
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

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update Project' });
  }
}



  static async deleteProject(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);
  
      if (!project) return res.status(404).json({ error: 'Project not found' });
  
      const assetsToDelete = [
        project.thumbnail,
        ...project.photos.map(p => p.url),
        ...project.videos.map(v => v.url),
      ].filter(Boolean);
  
      for (const assetUrl of assetsToDelete) {
        if (!assetUrl) continue;
  
        const filename = assetUrl.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));
  
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`projects_assets/${publicId}`, {
              resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image',
            });
          } catch (e) {
            console.warn(`Failed to delete asset ${publicId}:`, e);
          }
        }
      }
  
      await ProjectService.deleteProjectAssets(req.params.id); // << add this
      await ProjectService.deleteProject(req.params.id);
  
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete project and its assets' });
    }
  }
 

  static async getLastAddedProjects(req: Request, res: Response) {
    try {
      const lastAddedProjects = await ProjectService.getLastAddedProjects();
      res.json(lastAddedProjects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get last added projects' });
    }
  }
}
