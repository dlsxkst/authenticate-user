//import the modules that are required
const express = require('express')
const router = express.Router()
const authController = require('./authController')

//This method post will regiater the use
router.post('/register', (req, res) => {
        try {

                //retrive name, email and password from request body
                const {
                        name,
                        email,
                        password
                } = req.body
                if (!(name, email, password)) {
                        return res.status(400).send('Required input are missing')
                }
                const userDetails = {
                        name,
                        email,
                        password
                }
                //calling authController registeruser method return the error msg or the result
                authController.registerUser(userDetails, (err, result) => {
                        if (err) {
                                return res.status(400).send('User already exist..')
                        } else {
                                res.status(201).send(result)
                        }
                })
        } catch (err) {
                res.status(400).send('Unexpected error while registering the user')
        }
})

//This method post will login the user once they are registered
router.post('/login', (req, res) => {
        try {
                //retrive email and password from req.body
                const {
                        email,
                        password
                } = req.body
                if (!(email && password)) {
                        return res.status(400).send("Required inputs are missing")
                }
                //calling the authController login usermethod return the error or the result 
                authController.loginUser({
                        email,
                        password
                }, (err, result) => {
                        if (err) {
                                return res.status(401).send("Invalid credentials")
                        } else {
                                // res.status(200).send({
                                //         STATUS: "OK",
                                //         data: result
                                // })
                                if (result) { // Check if result is truthy
                                        res.status(200).send({
                                                STATUS: "OK",
                                                data: result
                                        })
                                } else { // If result is falsy, user is not verified
                                        res.status(401).send("User not verified")
                                }
                        }
                })
        } catch (err) {
                res.status(400).send('Unexpected error while logging the user')
        }

})

module.exports = router