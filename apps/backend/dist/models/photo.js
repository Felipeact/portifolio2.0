"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
class Photo {
    constructor(id, title, size, description) {
        this.id = id;
        this.title = title;
        this.size = size;
        this.description = description;
    }
    static fromFile(file) {
        return new Photo(file.id, file.originalname, file.size, 'Photo description');
    }
}
exports.Photo = Photo;
