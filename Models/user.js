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
        password:{
            type: String,
            require: true,
            },
        confirmPassword:{
            type: String,
            require: true,
            },
            trainers : 
            [{
                // type : mongoose.Schema.Types.ObjectId,
                type: String,
            }],
    },
    {
        timestamps: true,

    },

)

const User = mongoose.model("User",userSchema)
module.exports = User 


