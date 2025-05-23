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
                const { title, description, type, engine, description2, description3, description4, description5, tags } = req.body;
                const thumbnailFile = ((_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0]) || null;
                const thumbnail = thumbnailFile ? thumbnailFile.path : '';
                const photos = ((_c = req.files) === null || _c === void 0 ? void 0 : _c.photos) || [];
                const videos = ((_d = req.files) === null || _d === void 0 ? void 0 : _d.videos) || [];
                const blog = yield blogService_1.BlogService.createBlog({
                    type, engine, thumbnail, title, description,
                    description2, description3, description4, description5, tags,
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
    static updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            try {
                const { id } = req.params;
                const blog = yield blogService_1.BlogService.getBlogById(String(id));
                if (!blog) {
                    res.status(404).json({ error: 'Blog not found' });
                    return; // Return early, not assigning any response to the function result
                }
                const { title, description, type, engine, description2, description3, description4, description5, tags } = req.body;
                const thumbnailFile = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.thumbnail) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : null;
                const photos = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d.photos) !== null && _e !== void 0 ? _e : [];
                const videos = (_g = (_f = req.files) === null || _f === void 0 ? void 0 : _f.videos) !== null && _g !== void 0 ? _g : [];
                let uploadedThumbnail = blog.thumbnail;
                let uploadedPhotos = blog.photos;
                let uploadedVideos = blog.videos;
                // === Handle Thumbnail ===
                if (thumbnailFile === null || thumbnailFile === void 0 ? void 0 : thumbnailFile.path) {
                    const oldThumbFilename = (_j = (_h = blog.thumbnail) === null || _h === void 0 ? void 0 : _h.split('/').pop()) !== null && _j !== void 0 ? _j : '';
                    const oldThumbPublicId = oldThumbFilename.substring(0, oldThumbFilename.lastIndexOf('.'));
                    if (oldThumbPublicId) {
                        try {
                            yield cloudinary_1.default.uploader.destroy(`blog_assets/${oldThumbPublicId}`, {
                                resource_type: 'image',
                            });
                        }
                        catch (e) {
                            console.warn(`Failed to delete old thumbnail ${oldThumbPublicId}:`, e);
                        }
                    }
                    const uploadResult = yield cloudinary_1.default.uploader.upload(thumbnailFile.path, {
                        folder: 'blog_assets',
                        resource_type: 'image',
                    });
                    uploadedThumbnail = uploadResult.secure_url;
                }
                // === Handle New Photos ===
                if (photos.length > 0 && blog.photos.length > 0) {
                    for (const oldPhoto of blog.photos) {
                        if (!oldPhoto.url) {
                            console.warn('Old photo URL is missing.');
                            continue; // Skip this photo if the URL is missing
                        }
                        const filename = (_k = oldPhoto.url.split('/').pop()) !== null && _k !== void 0 ? _k : '';
                        const publicId = filename.substring(0, filename.lastIndexOf('.'));
                        if (publicId) {
                            try {
                                yield cloudinary_1.default.uploader.destroy(`blog_assets/${publicId}`, {
                                    resource_type: 'image',
                                });
                            }
                            catch (e) {
                                console.warn(`Failed to delete old photo ${publicId}:`, e);
                            }
                        }
                    }
                }
                if (photos.length > 0) {
                    uploadedPhotos = yield Promise.all(photos.map((photo) => __awaiter(this, void 0, void 0, function* () {
                        const uploadResult = yield cloudinary_1.default.uploader.upload(photo.path, {
                            folder: 'blog_assets',
                            resource_type: 'image',
                        });
                        return {
                            title: photo.originalname,
                            size: String(photo.size),
                            description: 'Photo',
                            url: uploadResult.secure_url,
                        };
                    })));
                }
                // === Handle New Videos ===
                if (videos.length > 0 && blog.videos.length > 0) {
                    for (const oldVideo of blog.videos) {
                        if (!oldVideo.url) {
                            console.warn('Old video URL is missing.');
                            continue; // Skip this video if the URL is missing
                        }
                        const filename = (_l = oldVideo.url.split('/').pop()) !== null && _l !== void 0 ? _l : '';
                        const publicId = filename.substring(0, filename.lastIndexOf('.'));
                        if (publicId) {
                            try {
                                yield cloudinary_1.default.uploader.destroy(`blog_assets/${publicId}`, {
                                    resource_type: 'video',
                                });
                            }
                            catch (e) {
                                console.warn(`Failed to delete old video ${publicId}:`, e);
                            }
                        }
                    }
                }
                if (videos.length > 0) {
                    uploadedVideos = yield Promise.all(videos.map((video) => __awaiter(this, void 0, void 0, function* () {
                        const uploadResult = yield cloudinary_1.default.uploader.upload(video.path, {
                            folder: 'blog_assets',
                            resource_type: 'video',
                        });
                        return {
                            title: video.originalname,
                            size: String(video.size),
                            description: 'Video',
                            url: uploadResult.secure_url,
                        };
                    })));
                }
                // === Call BlogService to update blog and replace media records ===
                const updatedBlog = yield blogService_1.BlogService.updateBlog(String(id), {
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
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to update blog' });
            }
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
                    ...blog.videos.map(v => v.url),
                ].filter(Boolean);
                for (const assetUrl of assetsToDelete) {
                    if (!assetUrl)
                        continue;
                    const filename = (_a = assetUrl.split('/').pop()) !== null && _a !== void 0 ? _a : '';
                    const publicId = filename.substring(0, filename.lastIndexOf('.'));
                    if (publicId) {
                        try {
                            yield cloudinary_1.default.uploader.destroy(`blog_assets/${publicId}`, {
                                resource_type: assetUrl.includes('.mp4') || assetUrl.includes('.mov') ? 'video' : 'image',
                            });
                        }
                        catch (e) {
                            console.warn(`Failed to delete asset ${publicId}:`, e);
                        }
                    }
                }
                yield blogService_1.BlogService.deleteBlogAssets(req.params.id); // << add this
                yield blogService_1.BlogService.deleteBlog(req.params.id);
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
