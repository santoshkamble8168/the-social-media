import express from "express"
import {getPosts, getUserPosts, likePost} from "../controller/posts.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

//read
router.get("/", authenticate, getPosts)
router.get("/userId/posts", authenticate, getUserPosts)

//update
router.patch("/:id/like", authenticate, likePost)

export default router
