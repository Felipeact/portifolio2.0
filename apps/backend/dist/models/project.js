"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
class Project {
    constructor(id, title, description, type, engine, thumbnail, description2, description3, description4, description5, tags = [], // <-- Include in constructor
    photos = [], video = [], createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.type = type;
        this.engine = engine;
        this.thumbnail = thumbnail;
        this.title = title;
        this.description = description;
        this.description2 = description2;
        this.description3 = description3;
        this.description4 = description4;
        this.description5 = description5;
        this.tags = tags;
        this.photos = photos;
        this.video = video;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromRequest(body, photos, video) {
        return new Project(0, // ID will be auto-generated
        body.title, body.description, body.type, body.engine, body.thumbnail, body.description2, body.description3, body.description4, body.description5, body.tags || [], // <-- Safely extract tags
        photos, video);
    }
}
exports.Project = Project;
