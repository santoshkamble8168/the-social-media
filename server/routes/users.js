import express from "express"
import {getUser, getUserFriends, addRemoveFriend} from "../controller/users.js"
import { authenticate } from "../middleware/auth.js"

const router = express.Router()

//read
router.get("/:id",authenticate, getUser)
router.get("/:id/friends", authenticate, getUserFriends)

//update
router.patch("/:id/:friendId", authenticate, addRemoveFriend)

export default router