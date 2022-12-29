const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000
const cors = require('cors');
const logger = require("morgan");

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));



const dotenv = require("dotenv")
dotenv.config()



const dbConfig = require("./Service/dbconfig");
dbConfig();


app.listen(PORT, (error) => {
    if (error) {
        console.log(`Server Start fail ${error}`);
    }
    else {
        console.log(`Server start successfully port is ${PORT}`);
    }
})