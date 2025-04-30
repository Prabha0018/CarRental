import express from "express";
import {createcar,getcars,createbook,getbooks,cancelbook,getCarByRegNo,uploadImage} from "../controllers/CarControllers.js";
const router=express.Router()
router.get("/allcars",getcars);
router.get("/allbooks",getbooks);
router.get("/car/:regno", getCarByRegNo);
router.post("/createbook",createbook);
router.post("/createcar",createcar);
router.post("/upload", uploadImage);
router.delete("/cancelbook/:id",cancelbook);
export default router;