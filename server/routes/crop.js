import express from "express";
import{
    cropGraph

} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();
router.post("/cropgraph",cropGraph);
export default router;