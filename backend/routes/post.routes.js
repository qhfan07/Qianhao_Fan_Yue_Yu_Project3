import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, deletePost, getUserPosts, getAllPosts, editPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/user/:username", protectRoute, getUserPosts);
router.get("/", getAllPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/edit/:id", protectRoute, editPost); 

export default router;
