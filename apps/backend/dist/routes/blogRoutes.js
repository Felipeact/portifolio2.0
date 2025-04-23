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
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
router.post('/', multer_1.default.fields([
    { name: 'photos', maxCount: 10 },
    { name: 'videos', maxCount: 2 },
    { name: 'thumbnail', maxCount: 1 }
]), blogController_1.BlogController.createBlog);
router.get('/', blogController_1.BlogController.getAllBlogs);
router.get('/latest', blogController_1.BlogController.getLastAddedBlogs);
router.get('/:id', blogController_1.BlogController.getBlogById);
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogController_1.BlogController.deleteBlog(req, res);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
}));
exports.default = router;
