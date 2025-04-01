const express= require("express");
const dotenv= require("dotenv");
const dbconnect= require("./DB/dbconnect.js");
const authRouter= require("./routes/authUser.js");
const messageRouter= require("./routes/message.js");
const userRoute= require("./routes/user.js");
const userControl= require("./Controllers/user.js");
const cookieParser= require("cookie-parser");


dotenv.config();
const app= express();
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("hello world");
})
const port= process.env.PORT || 8051;

app.use("/api/auth",authRouter);
app.use("/api/message",messageRouter);
app.use("/api/user",userRoute);


app.listen(port,()=>{
    dbconnect();
    console.log(`Server is working on port ${port}`);
})