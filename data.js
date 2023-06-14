const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();
app.use(express.json());
const axios = require("axios")
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://singh-csm:GIUPM5681K@singh-csm.nmfw5jk.mongodb.net/fridaypeer")
.then(()=>console.log("Connect to db"))
.catch((err)=>console.log(err))

const dataSchema = new mongoose.Schema({
    postIid: Number,
    id:Number,
    name:String,
    email:String,
    body:String,
    tes:[String],
},{timestamps:true})

const comment = mongoose.model("commentsdata", dataSchema)


// app.get("/get", (req, res)=>{
//     axios.get("https://jsonplaceholder.typicode.com/comments")
//     .then((response)=>{
//         response.data
//         console.log(response.data)
//         comment.insertMany(response.data)
//         res.send(response.data)
//     })
//     .catch((err)=>console.log(err))
//     }
    
//     )
app.get('/', (req, res) => {
    const currentDate = new Date().toDateString();
  
    res.render('index', { currentDate }); // Render index.ejs and pass data
  });

app.get("/random", async (req, res) => {
    const number = Math.floor(Math.random() * 100)
    res.render("login", { number })
})

app.get("/signin", async (req, res)=>{
    let data = req.body;
    let { name, email} = data
    console.log(data)
    res.render("form")

})


app.get("/list" , (req, res)=>{
    axios.get("https://type.fit/api/quotes")
    .then((response)=>{
        response.data
        //console.log(response.data)
        let data = response.data
      let tes=  data.map((val, i)=>val.text)
      let page = req.query.page|| req.body.page || 1
      let limit = 5;
      let skip = (page -1)* limit
      tes =tes.slice(skip, skip+limit)
      comment.insertMany({tes})
        res.render("list", {tes})
    })
})

app.listen(3000, ()=>{
    console.log("listening on")
})