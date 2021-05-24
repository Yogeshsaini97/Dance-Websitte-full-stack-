const express=require("express")
const path=require("path")
const mango=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser")


mongoose.connect('mongodb://localhost/contactdancing', {useNewUrlParser: true});


var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    phoneno: String

  });

var luggage = mongoose.model('luggage', contactSchema);


// express manufacturing
mango.use("/fileread",express.static("fileread"))
mango.use(express.urlencoded())


mango.set("view engine","pug")
mango.set("views",path.join(__dirname,"views"))

mango.get("/home",(req,res)=>{
    res.status(200).render("home.pug")
})

mango.get("/contact",(req,res)=>{
    res.status(200).render("contactus.pug")
})
mango.post("/contact",(req,res)=>{
    var mydata = new luggage(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    })
})

 
mango.get("/about",(req,res)=>{
    res.status(200).render("aboutus.pug")
})

mango.get("/services",(req,res)=>{
    res.status(200).render("services.pug")
})


mango.listen(8000,()=>{
    console.log("the app started")
})

