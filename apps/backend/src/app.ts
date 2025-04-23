import express from 'express';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // to cserve files
app.use('/api/blogs', blogRoutes);



export default app;
