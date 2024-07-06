const express =require("express") 
const app = express()
require("dotenv").config();
const port = process.env.PORT || 4000
const cors = require("cors")
const mongoose = require("mongoose")
const fileUpload = require("express-fileupload")

const cookieParser = require("cookie-parser")

const  dbConnect = require("./config/database")
const  ConnectToCloudinary = require("./config/cloudinary")
dbConnect()
ConnectToCloudinary()
 
const userRoutes = require("./Routes/User")
const profileRoutes = require("./Routes/Profile")
const paymentRoutes = require("./Routes/Payments")
const courseRoutes = require("./Routes/Course")


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());   

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)

app.use(cors({origin:"http://localhost:3000",credentials:true}))

app.listen(port,()=>{ 
    console.log(`server is running on port ${port}`)
})
app.get("/" ,(req,res)=>{
    res.send("hello world")
})






