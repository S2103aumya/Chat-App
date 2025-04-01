const mongoose= require("mongoose");

const dbconnect= async() =>{
    try{
        await mongoose.connect(process.env.ATLAS_URL),
        console.log("db connected successfully");
        
    } catch(err) {
        console.log(err);
    }
}

module.exports = dbconnect