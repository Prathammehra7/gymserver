const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    trainersimg:
    {
        type: String,
        required: true
    },
    trainersName:
    {
        type: String,
        required: true
    },
    trainersAge:
    {
        type: Number,
        required: true
    },
    trainersHeight:
    {
        type: Number,
        required: true
    },
    trainersTime:
    {
        type: String,
        required: true
    },
    trainersPrice:
    {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    });

const Trainers = mongoose.model("Trainers", trainerSchema);

module.exports = Trainers;
