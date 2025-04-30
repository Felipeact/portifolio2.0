import { Request, Response } from 'express';
import { ProjectService } from '../services/projectService';
import cloudinary from '../config/cloudinary';

export class ProjectController {
  static async createproject(req: Request, res: Response) {
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

  static async getAllprojects(req: Request, res: Response) {
    const projects = await ProjectService.getAllProjects();
    res.json(projects);
  }

  static async getprojectById(req: Request, res: Response ) {
    const project = await ProjectService.getProjectById(req.params.id);
    res.json(project);
  }

  
  static async updateproject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const stringId = String(id);
  
      const {
        title, description, type, engine,
        description2, description3, description4, description5, tags
      } = req.body;
  
      const thumbnailFile = (req.files as any)?.thumbnail?.[0] || null;
      const photos = (req.files as any)?.photos || [];
      const videos = (req.files as any)?.videos || [];
  
      let uploadedThumbnail = '';
      let uploadedPhotos = [];
      let uploadedVideos = [];
  
      const existingProject = await ProjectService.getProjectById(stringId);
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Helper to extract public ID from Cloudinary URL
      const extractPublicId = (url: string): string => {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const withoutExtension = filename.substring(0, filename.lastIndexOf('.'));
        return `project_assets/${withoutExtension}`;
      };
  
      // Upload new thumbnail and delete old one
      if (thumbnailFile) {
        const uploadResult = await cloudinary.uploader.upload(thumbnailFile.path, {
          folder: 'project_assets',
          resource_type: 'image'
        });
        uploadedThumbnail = uploadResult.secure_url;
  
        // Delete old thumbnail from Cloudinary
        const oldPublicId = extractPublicId(existingProject.thumbnail);
        if (oldPublicId) {
          await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' });
        }
      } else {
        uploadedThumbnail = existingProject.thumbnail;
      }
  
      // Upload new photos if any
      if (photos.length > 0) {
        uploadedPhotos = await Promise.all(
          photos.map(async (photo: any) => {
            const uploadResult = await cloudinary.uploader.upload(photo.path, {
              folder: 'project_assets',
              resource_type: 'image'
            });
            return {
              title: photo.originalname,
              size: String(photo.size),
              description: 'Photo',
              url: uploadResult.secure_url
            };
          })
        );
      }
  
      // Upload new videos if any
      if (videos.length > 0) {
        uploadedVideos = await Promise.all(
          videos.map(async (video: any) => {
            const uploadResult = await cloudinary.uploader.upload(video.path, {
              folder: 'project_assets',
              resource_type: 'video'
            });
            return {
              title: video.originalname,
              size: String(video.size),
              description: 'Video',
              url: uploadResult.secure_url
            };
          })
        );
      }
  
      // Update the project in DB
      const updatedproject = await ProjectService.updateProject(stringId, {
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
        videos: uploadedVideos
      });
  
      res.status(200).json(updatedproject);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }
  

  static async deleteproject(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(req.params.id);

      if (!project) return res.status(404).json({ error: 'project not found' });

      const assetsToDelete = [
        project.thumbnail,
        ...project.photos.map(p => p.url),
        ...project.videos.map(v => v.url)
      ].filter(Boolean);

      for (const assetUrl of assetsToDelete) {
        if (!assetUrl) continue;

        const filename = assetUrl.split('/').pop() ?? '';
        const publicId = filename.substring(0, filename.lastIndexOf('.'));

        if (publicId) {
          try {
            await cloudinary.uploader.destroy(`project_assets/${publicId}`, {
              resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image'
            });
          } catch (e) {
            console.warn(`Failed to delete asset ${publicId}:`, e);
          }
        }
      }

      await ProjectService.deleteProject(String(req.params.id));
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete project and its assets' });
    }
  }

 

  static async getLastAddedprojects(req: Request, res: Response) {
    try {
      const lastAddedprojects = await ProjectService.getLastAddedProjects();
      res.json(lastAddedprojects);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to get last added projects' });
    }
  }
}
