const express = require("express")
const mangoose = require("mongoose");
const bodyparser = require("body-parser");
// const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express ();


const port = 3000;
mongoose.connect("mongodb+srv://visheshsuraj9:Hlw4NA01bQwNlijw@registration-form.hgrhe8e.mongodb.net/");

const registrationSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});

const registration = mongoose.model("registration", registrationSchema);
app.use(bodyparser.urlencoded ({extended: true})); 
app.use(bodyparser.json()); 


// var db=mongoose.connection;
// db.on("error", ()=> {
//     console.log("tumse nahi ho payega");
// });
// db.once("open", ()=> {
//     console.log("tmse ho gya");
// });

app.get("/",(req, res) => { 
    res.sendFile(__dirname + "/form/index.html");
    })
    
app.post("/register",async (req, res)=> {
    try{
        const{name, email, password} = req.body;
         
       const existinguser = await registration.findOne({email : email});
       if(!existinguser){
        const registrationData = new registration({
        name,
        email,
        password
        });
         
await registrationData.save();
res.redirect("/success");
       }
           else {
    console.log("user already exist");
    res.redirect("/error");
}

    }  catch (error){
        console.log(error);
        res.redirect("error");
    }
})

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/form/success.html");

})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/form/error.html")
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})