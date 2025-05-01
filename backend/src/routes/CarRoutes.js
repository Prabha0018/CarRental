import express from "express";
import {createcar,getcars,createbook,getbooks,cancelbook,getCarByRegNo,uploadImage,verifyPasskey} from "../controllers/CarControllers.js";
import verifyPassKey from "../middleware/passKeyMiddleware.js";

const router = express.Router();

router.get("/allcars", getcars);
router.get("/allbooks", getbooks);
router.get("/car/:regno", getCarByRegNo);
router.post("/createbook", createbook);
router.post("/createcar", verifyPassKey, createcar);
router.post("/upload", verifyPassKey, uploadImage);
router.post("/verify-passkey", verifyPasskey);
router.delete("/cancelbook/:id", cancelbook);

export default router;