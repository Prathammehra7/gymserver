const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const razorpay = require('razorpay');
const authFile = require("../Service/Authentication");



var salt = bcrypt.genSalt(10);
router.post("/Signup", async (req,res) => {

    try {
        
        
        const {Name, Email, password, confirmPassword} = req.body;
        var hash = bcrypt.hashSync(req.body.password);
        var secondhash = bcrypt.hashSync(req.body.confirmPassword);
        const letters = /^[a-zA-Z]*$/;
        const oldUser = await User.findOne({Email});

        if(!(Name && Email && password && confirmPassword))
        {
            return res.status(400).send("Something you are missing");
        }
        else if(!(Name.match(letters)))
        {
             return res.status(400).send('Name does not contain special characters')
        }  
        else if (oldUser)
        {
            return res.status(409).send('You are already exist..Please login')
        }
        else if(password !== confirmPassword)
        {
            return res.status(400).send("Password does not match!");
        }
        else if(password.length < 8 && confirmPassword.length < 8)
        {
            return res.status(400).send('Password should have min 8 characters');
        }
        else 
        {
            await User.create({
                Name: req.body.Name,
                Email: req.body.Email,
                password: hash,
                confirmPassword: secondhash,
            })
        }

        return res.status(200).send('User created successfully');

    } catch (error) {

        console.log(error);
    }    
});




router.post("/Login", async(req,res) => {

    try {
        
        const user = await User.findOne({Email: req.body.Email});
        const check = bcrypt.compareSync(req.body.password, user.password);


        if(!(user && check)) {
            return res.status(401).send('Invalid Credentials')
        }
        else if(user.length < 0)
        {
            return res.status(401).send('Email does not exist!');
        }

        const token = authFile.getToken(user._id);
        return res.status(200).send({
            userID : user._id,
            token : token,
            "message" : "User login successfully"
        });

        
    } catch (error) {

        console.log(error);
    }
})

router.get("/userdata",  async (req, res) => {
    const data = await User.find({});

    return res.send(data);
})

router.delete("/deleteaccount/:usersid", async (req, res) => {
    const id  = req.params.usersid;

    if(!id)
    {
        return res.send("keep eneter the Id")
    }
    const userId = await User.findByIdAndDelete(id);

    if(!userId)
    {
        return res.status(500).send("User not exist");
    }
    return res.send("Account Successfully delete");
})


router.post("/trainers/:trainerid", async(req,res) => {

    try {
        const userid = req.body.id;
        const trainerid = req.params.trainerid;
        console.log(userid,trainerid);
        const updatedUser = await User.findByIdAndUpdate(userid,{
    
            $push : {trainers : trainerid}
        },
        {
            new : true,
            runValidators : true,
        });
        return res.send(updatedUser);        
    } catch (error) {
        console.log(error);
    }
});


module.exports = router














