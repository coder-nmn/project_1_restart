const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


//register controller
async function registerController(req, res){
    const {email, username, password, bio, profileImage} = req.body

    

    // checking that user exist previously or not on the basis of usernma or email
    const isUserExist = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    //if user exist
    if(isUserExist){
        return res.status(409).json({
            message : "user already " + (isUserExist.email ==
                 email ? "email already exist" : "username already exist")
        })
    }

    // converting pass into hash
    const hash = crypto.createHash('sha256').update(password).digest('hex')

    //creating a user
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password : hash
    })

    //creating token
    const token = jwt.sign({
        if : user._id
    },process.env.JWT_SECRET,
    {expiresIn: "1d"})

    res.cookie("token", token) // token creation


    // server sending res that user registred
    res.status(201).json({
        message : "user registered finely.",
        user : {
            email : user.email,
            username : user.username,
            bio  :user.bio,
            profileImage : user.profileImage
        }

    })
}




//login controller
async function loginController( req, res){
    const {username, email, password, } = req.body

    const user = await userModel.findOne({
        $or : [
            {
                username  :username

            },
            {
                email  :email

            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message  :"user not found"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const isPassValid = hash == user.password

    if(!isPassValid){
        return res.status(401).json({
            message  : "pass is not valid"
        })
    }

    const token  = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {expiresIn : "1d"}
    )

    res.cookie("token", token)

    res.status(201).json({
        message : "user logged in finely.",
        user : {
            email : user.email,
            username : user.username,
            bio  :user.bio,
            profileImage : user.profileImage
        }
    })

}

module.exports = {loginController, registerController}