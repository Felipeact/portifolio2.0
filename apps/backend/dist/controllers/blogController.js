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
exports.BlogController = void 0;
const blogService_1 = require("../services/blogService");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
class BlogController {
    static createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const { title, description, type, engine, description2, description3, description4, description5 } = req.body;
                const thumbnailFile = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0]) || null;
                const thumbnail = thumbnailFile ? thumbnailFile.path : '';
                const photos = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.photos) || [];
                const videos = ((_d = req.files) === null || _d === void 0 ? void 0 : _d.videos) || [];
                const blog = yield blogService_1.BlogService.createBlog({
                    type, engine, thumbnail, title, description,
                    description2, description3, description4, description5,
                    photos: photos.map((photo) => ({
                        title: photo.originalname,
                        size: String(photo.size),
                        description: 'Photo',
                        url: photo.path
                    })),
                    videos: videos.map((video) => ({
                        title: video.originalname,
                        size: String(video.size),
                        description: 'Video',
                        url: video.path
                    }))
                });
                res.status(201).json(blog);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to create blog' });
            }
        });
    }
    static getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogService_1.BlogService.getAllBlogs();
            res.json(blogs);
        });
    }
    static getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogService_1.BlogService.getBlogById(req.params.id);
            res.json(blog);
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const blog = yield blogService_1.BlogService.getBlogById(req.params.id);
                if (!blog)
                    return res.status(404).json({ error: 'Blog not found' });
                const assetsToDelete = [
                    blog.thumbnail,
                    ...blog.photos.map(p => p.url),
                    ...blog.videos.map(v => v.url)
                ].filter(Boolean);
                for (const assetUrl of assetsToDelete) {
                    if (!assetUrl)
                        continue;
                    const filename = (_a = assetUrl.split('/').pop()) !== null && _a !== void 0 ? _a : '';
                    const publicId = filename.substring(0, filename.lastIndexOf('.'));
                    if (publicId) {
                        try {
                            yield cloudinary_1.default.uploader.destroy(`blog_assets/${publicId}`, {
                                resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image'
                            });
                        }
                        catch (e) {
                            console.warn(`Failed to delete asset ${publicId}:`, e);
                        }
                    }
                }
                yield blogService_1.BlogService.deleteBlog(String(req.params.id));
                res.sendStatus(204);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to delete blog and its assets' });
            }
        });
    }
    static getLastAddedBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastAddedBlogs = yield blogService_1.BlogService.getLastAddedBlogs();
                res.json(lastAddedBlogs);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to get last added blogs' });
            }
        });
    }
}
exports.BlogController = BlogController;
