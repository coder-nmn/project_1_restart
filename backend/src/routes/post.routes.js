const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage  :multer.memoryStorage() })



//POST /api/post
postRouter.post("/",upload.single("img"),  postController.createPostController)

//GET /api/posts
postRouter.get("/", postController.getPostController )


//GET /api/posts/details/:postid
//return an detail about specific post with the id, also check whther the post belongs to the user that thee request comes from

postRouter.get("/details/:postId", postController.getPostDetails)


module.exports = postRouter
