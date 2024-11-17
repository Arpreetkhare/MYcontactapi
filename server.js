const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require ("dotenv").config();


connectDb();
const app = express();
app.use(express.json()); 

app.use("/api",require("./routers/contactRouter"));
app.use("/api/user",require("./routers/userRouter"));



const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log (`server running on port ${port}`);
}) 




console.log(" i am in my prac project");

