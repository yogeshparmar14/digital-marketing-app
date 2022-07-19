const dotenv = require("dotenv");
    dotenv.config();
const express = require("express");
const cors= require("cors");
const connectDb=require("./src/db/connectiondb.js");
const userRoutes =require("./src/routes/userRoutes.js");
const adminRoutes =require("./src/routes/adminRoutes.js");
const imageRoutes =require("./src/modules/common/uploadFile.js")
const path = require('path')


const app = express();
const port = process.env.PORT;
const DATABASE_URL_LOCAL =process.env.DATABASE_URL_LOCAL
const DATABASE_URL_ATLAS =process.env.DATABASE_URL_ATLAS

app.set("view engine","hbs")
app.set("views","./view")
app.use(express.static(__dirname + "/public"))


//cors policy
app.use(cors());

//json
app.use(express.json());
//Database connection
// connectDb(DATABASE_URL_ATLAS);
connectDb(DATABASE_URL_LOCAL, DATABASE_URL_ATLAS);

//for Loading Routes
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/common",imageRoutes)

app.get("/",(req,res)=>{
     res.render("index")
})

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})