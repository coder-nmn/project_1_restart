const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next){
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

        req.user = decoded

        next()
}

module.exports = identifyUser