import express from "express";
import{
    getUser,
} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

/* Read */

router.get("/:id",verifyToken,getUser);
/* router.get("/:id/friends",verifyToken, getUserFriend);  */

/* update */
/* router.patch("/:id/:friendID",verifyToken,addRemoveFriend); */

export default router;