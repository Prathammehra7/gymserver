const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            require: true,
            },
        Email:{
            type: String,
            require: true,
            },
        Password:{
            type: String,
            require: true,
            },
        Cpassword:{
            type: String,
            require: true,
            },
    },
    {
        timestamps: true,

    },

)

const User = mongoose.model("User",userSchema)
module.exports = User 


