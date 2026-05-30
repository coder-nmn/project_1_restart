const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : [true],
        required : [true]
    },
    email :{
         type : String,
        unique : [true],
        required : [true]
    },
    password :{
         type : String,
        required : [true]
    },
    bio :String,
    profileImage : {
         type : String,
        default : "https://ik.imagekit.io/pugwcxtqc/default-avatar-icon-of-social-media-user-vector.jpg?updatedAt=1770737897328"
    },
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ],
    following : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ]
    
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel