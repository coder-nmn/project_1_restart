
const mmongoose = require("mongoose")

async function connectToDB() {
    await mmongoose.connect(process.env.MONGO_URI)

    console.log("DB connected");
    
    
}

module.exports = connectToDB