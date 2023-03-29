const express = require("express");
const router = express.Router();
const authFile = require("../Service/Authentication");
const trainer = require("../Models/trainers")
router.post("/trainerscreate", async (req, res) => {
    try {
        const ticketData = {
            trainersimg: req.body.trainersimg,
            trainersName: req.body.trainersName,
            trainersAge: req.body.trainersAge,
            trainersHeight: req.body.trainersHeight,
            trainersTime: req.body.trainersTime,
            trainersPrice: req.body.trainersPrice,


        }

        await trainer.create(ticketData);

        return res.send("Trainer Successfully Created");
    } catch (error) {
        console.log(error)
    }
})

router.delete("/trainersdelete/:trainerid",  async (req, res) => {
    const id = req.params.trainerid;

    await trainer.findByIdAndDelete(id);

    return res.send("trainer Successfully Delete");
})

router.get("/getTrainers",  async (req, res) => {
    const trainer = await trainer.find({});

    return res.send(trainer);
})

router.get("/findtrainers/:trainerid", async (req, res) => {

    try {
        if (!trainer) {

            return res.status(500).send("Trainer not found");
        }
        else {
            const trainerid = req.params.trainerid;

            const Movie = await trainer.findById(trainerid);

            return res.send(Movie);
        }

    } catch (error) {
        console.log(error);
    }


});

router.get("/trainers/:trainerid", async (req, res) => {
    const userid = req.body.id;
    const trainerid = req.params.trainerid;

    const user = await trainer.findByIdAndUpdate(userid, {
        trainer: trainerid
    },
        {
            new: true,
            runValidators: true,
        })

    return res.send(user);
})


module.exports = router


