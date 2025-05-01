import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import DBConnector from "../config/dbconnector.js"
import CarRoute from '../routes/CarRoutes.js'
import authRoutes from '../routes/auth.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
DBConnector()

const app = express()
const PORT = process.env.PORT || 4004;

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use("/api/", CarRoute)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})