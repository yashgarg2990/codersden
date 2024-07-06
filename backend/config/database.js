const mongoose =require("mongoose")
require("dotenv").config()

const db_url = process.env.DB_URL
const dbConnect=() =>{
    mongoose.connect(db_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        }).then(()=>{
            console.log("connected to database")

})
.catch((error)=>{
    console.log("cannot connect to database :" ,error)
    process.exit(1);
})

}
module.exports=dbConnect