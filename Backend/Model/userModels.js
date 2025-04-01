
const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"],
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    profilepic:{
        type:String,
        required:true,
    }
}, { timestamps: true });

const User= mongoose.model("User",userSchema);

module.exports= User;