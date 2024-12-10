import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, deletePost, getUserPosts, getAllPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/user/:username", protectRoute, getUserPosts);
router.get("/", getAllPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
// router.edit("/edit/:id", editRoute, editPost); 可能的edit

export default router;
