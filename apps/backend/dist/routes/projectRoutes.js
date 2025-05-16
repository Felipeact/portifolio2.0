"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../config/multer"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
router.post('/', multer_1.default.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
]), projectController_1.ProjectController.createProject);
router.get('/', projectController_1.ProjectController.getAllProjects);
router.get('/latest', projectController_1.ProjectController.getLastAddedProjects);
router.get('/:id', projectController_1.ProjectController.getProjectById);
router.put('/:id', multer_1.default.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
]), projectController_1.ProjectController.updateProject);
router.delete('/:id', multer_1.default.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield projectController_1.ProjectController.deleteProject(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
}));
exports.default = router;
