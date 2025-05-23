"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads')); // to cserve files
//Routes
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
exports.default = app;
