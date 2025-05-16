import express from 'express';
import upload from '../config/multer';
import { ProjectController } from '../controllers/projectController';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);
router.get('/latest', ProjectController.getLastAddedProjects);
router.get('/:id', ProjectController.getProjectById);

router.put(
  '/:id',
  upload.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  ProjectController.updateProject
);

router.delete('/:id', upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'photos', maxCount: 10 },
  { name: 'videos', maxCount: 5 }
]), async (req, res) => {
  try {
    await ProjectController.deleteProject(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});


export default router;
