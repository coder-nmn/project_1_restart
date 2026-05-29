const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


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

module.exports = {
    createPostController
}