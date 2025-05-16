import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';
import projectRoutes from './routes/projectRoutes'



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // to cserve files


//Routes
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);


export default app;
