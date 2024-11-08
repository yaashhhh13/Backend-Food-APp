const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const ImageRoute = require("./routes/Image.js")
const userRegisterRoute = require("./routes/user.js")
const foodRoute = require("./routes/FoodRoute.js")
const OrderRoute = require("./routes/OrderRoute.js")
const app = express()
dotenv.config()
const cors = require("cors")


const port = process.env.PORT || 8000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res)=>{
    res.send("hello world")
})


// database connection

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("connected to database");
    } catch (error) {
        throw error
    }
}


mongoose.connection.on("disconnected", ()=> {
    console.log("disconnected")
})

mongoose.connection.on("connected", ()=> {
    console.log("connected")
})


app.use('/api/v1/all',ImageRoute);
app.use('/api/v1/user',userRegisterRoute);
app.use('/api/v1/FoodRoute', foodRoute);
app.use('/api/v1/Order',OrderRoute);


app.listen(port, ()=>{
    connect();
    console.log(`listening from ${port}`)
})