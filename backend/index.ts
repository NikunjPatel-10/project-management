import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes';
import projectRouter from './routes/projectRoutes';
import taskRouter from './routes/taskRoutes';
import authRouter from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const app = express();

// Configure CORS
app.use(cors({
  origin:'*'
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/login', authRouter);
app.use('/users', userRoutes);
app.use('/projects', projectRouter);
app.use('/tasks', taskRouter);

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
