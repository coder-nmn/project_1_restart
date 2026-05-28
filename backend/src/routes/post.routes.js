const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage  :multer.memoryStorage() })



//POST /api/post
postRouter.post("/",upload.single("img"),  postController.createPostController)


module.exports = postRouter
