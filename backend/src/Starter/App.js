import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import DBConnector from "../config/dbconnector.js"
import CarRoute from '../routes/CarRoutes.js'
import authRoutes from '../Routes/auth.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
DBConnector()
const PORT=4004;
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use("/api/",CarRoute)
app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`)
})