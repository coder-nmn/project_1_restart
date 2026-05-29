const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// create post controller
async function createPostController(req, res) {
    // console.log(req.body, req.file);

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorised access, token not provided"
        })
    }
    let decoded = null;

    //token authrity manages here
    try {

        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        return res.status(401).json({
            message: "user not authorised"
        })

    }


    //image kit file upload code
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort_2_pro_1_restart_posts"

    })

    //post creation 
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created finely.",
        post
    })




    // res.send(file)


}

//get post controller
async function getPostController(req, res){
    
    const token = req.cookies.token;
    let decoded;
    try {
        
     decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message : "token invalid"
        })
        
    }

    const userId = decoded.id;

    const posts = await postModel.find({
        user : userId
    })

    res.status(200).json({
        message : "post fetched finely",
        posts
    })

}


// get post detail
async function getPostDetails(req, res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "token not found, unauthorised"
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        
    } catch (error) {
        res.status(401).json({
            message  : " token wrong"
        })
        
    }

    const userId = decoded.id
    const postId = req.params.postId


    const post  = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "post not founs"
        })
    }

    const isValidUser = post.user.toString() === userId
    console.log(post.user.toString());
    console.log(userId);
    

    if(!isValidUser){
        return res.status(403).json({
            message  : "forbidden content"
        })
    }

    return res.status(200).json({
        message : "post fetched finely",
        post
    })

    

}
module.exports = {
    createPostController,
    getPostController,
    getPostDetails
}