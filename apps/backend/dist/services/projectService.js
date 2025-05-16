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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const prismaClient_1 = require("../prismaClient");
class ProjectService {
    static createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.prisma.project.create({
                data: Object.assign(Object.assign({}, data), { photos: {
                        create: data.photos.map((photo) => (Object.assign({}, photo)))
                    }, videos: {
                        create: data.videos.map((video) => (Object.assign({}, video)))
                    } }),
                include: {
                    photos: true,
                    videos: true
                }
            });
        });
    }
    static getAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.project.findMany({ include: { photos: true, videos: true } });
        });
    }
    static getLastAddedProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.project.findMany({
                take: 4,
                orderBy: { createdAt: 'desc' },
                include: { photos: true, videos: true }
            });
        });
    }
    static getProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.project.findUnique({
                where: { id },
                include: { photos: true, videos: true }
            });
        });
    }
    static updateProject(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProject = yield prismaClient_1.prisma.project.findUnique({
                where: { id },
                include: { photos: true, videos: true }
            });
            if (!existingProject) {
                throw new Error('Project not found');
            }
            // Manage thumbnail
            const thumbnail = data.thumbnail ? data.thumbnail : existingProject.thumbnail;
            // If no new photos/videos uploaded, keep old ones
            const photos = data.photos && data.photos.length > 0 ? data.photos : existingProject.photos;
            const videos = data.videos && data.videos.length > 0 ? data.videos : existingProject.videos;
            return prismaClient_1.prisma.project.update({
                where: { id },
                data: Object.assign(Object.assign({}, data), { thumbnail, photos: {
                        deleteMany: {}, // Always clear old because we'll re-create
                        create: photos.map((photo) => ({
                            title: photo.title,
                            size: String(photo.size),
                            description: photo.description || 'Photo',
                            url: photo.url
                        }))
                    }, videos: {
                        deleteMany: {},
                        create: videos.map((video) => ({
                            title: video.title,
                            size: String(video.size),
                            description: video.description || 'Video',
                            url: video.url
                        }))
                    } }),
                include: {
                    photos: true,
                    videos: true
                }
            });
        });
    }
    static deleteProjectAssets(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.prisma.photo.deleteMany({
                where: { projectId },
            });
            yield prismaClient_1.prisma.video.deleteMany({
                where: { projectId },
            });
        });
    }
    static deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.project.delete({
                where: { id },
                include: { photos: true, videos: true }
            });
        });
    }
}
exports.ProjectService = ProjectService;
