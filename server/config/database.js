const mongoose = require('mongoose')
require('dotenv').config();

const  dbConnection = ()=> {
    mongoose.connect(process.env.MONGODB_URL)
    .then( ()=>{ console.log("DB Connection successful")})
    .catch((error)=>{
        console.log("issue in DB Connection")
        console.error(error.message)
    })
}

module.exports = dbConnection;

