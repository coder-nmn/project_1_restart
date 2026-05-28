const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")



//POST /api/post
postRouter.post("/", postController.createPostController)
