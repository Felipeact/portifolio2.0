"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(id, type, engine, title, description, photos = [], videos = []) {
        this.id = id;
        this.type = type;
        this.engine = engine;
        this.title = title;
        this.description = description;
        this.photos = photos;
        this.videos = videos;
    }
}
exports.Project = Project;
