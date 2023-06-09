//import the required module
const express = require("express");
const router = express.Router();
const userController = require("./userController");

//This get method will get the user with token
router.get("/", (req, res) => {
        try {
                //retrive userdata from req claims
                const userdata = req.claims;
                console.log(userdata);
                if (!userdata.email) {
                        return res.status(400).send("User email not available");
                }

                //Calling controller findUser method return the error or result
                userController.findUser(userdata.email, (err, result) => {
                        if (err) {
                                res.status(400).send("error getting the user", err);
                        } else {
                                res.status(200).send({
                                        Status: "OK",
                                        data: result,
                                });
                        }
                });
        } catch (err) {
                res.status(500).send({
                        error: "Unexpected error. Try after sometime"
                })
        }
});

module.exports = router;