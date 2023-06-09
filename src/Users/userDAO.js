//import users.json file and fs module
const fs = require('fs')
const users = require('./users.json')

//This method will findUser
function findUser(email, done) {
    //use filter method to find the user from json file
    const userFetched = users.filter((user) => user.email === email)[0]
    if(userFetched === undefined){
        return done({error: "No data found"});
    }
    done(undefined, userFetched)
}

//This method will register user
function registerUser(userData, done) {
    users.pudh(userData)
    //call fileWrite method and write the user in json file
    fs.writeFileSync('./Users/users.json', JSON.stringify(users))
    done(undefined, userData)
}

module.exports = {
    findUser,
    registerUser
}