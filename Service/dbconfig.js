const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const dbconnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://prathammehra:7ju4yNykmchBifif@cluster0.rpzdfzl.mongodb.net/gymserver?retryWrites=true&w=majority`, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });

        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        console.log(`Error in Connecting to mongoDB ${error}`);
    }
};


module.exports = dbconnect;