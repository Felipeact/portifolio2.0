"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
class Video {
    constructor(id, title, size, description) {
        this.id = id;
        this.title = title;
        this.size = size;
        this.description = description;
    }
    static fromFile(file) {
        return new Video(file.id, file.originalname, file.size, 'Video description');
    }
}
exports.Video = Video;
