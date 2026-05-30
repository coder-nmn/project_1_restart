const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage  :multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")



//POST /api/post
postRouter.post("/",upload.single("img"), identifyUser,  postController.createPostController)

//GET /api/posts
postRouter.get("/", identifyUser, postController.getPostController )


//GET /api/posts/details/:postid
//return an detail about specific post with the id, also check whther the post belongs to the user that thee request comes from

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


module.exports = postRouter
