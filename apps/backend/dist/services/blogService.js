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
exports.BlogService = void 0;
const prismaClient_1 = require("../prismaClient");
class BlogService {
    static createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.prisma.blog.create({
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
    static getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.blog.findMany({ include: { photos: true, videos: true } });
        });
    }
    static getLastAddedBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.blog.findMany({
                take: 4,
                orderBy: { createdAt: 'desc' },
                include: { photos: true, videos: true }
            });
        });
    }
    static getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.blog.findUnique({
                where: { id },
                include: { photos: true, videos: true }
            });
        });
    }
    static deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.prisma.blog.delete({
                where: { id },
                include: { photos: true, videos: true }
            });
        });
    }
}
exports.BlogService = BlogService;
