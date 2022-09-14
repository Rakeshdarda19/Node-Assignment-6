const { EmojiFlagsRounded } = require("@material-ui/icons");
const express = require("express");
const app = express()
const mongoose = require('mongoose');
const blog = require("./model/blog_data");

app.use(express.json())
app.post("/blog", async(req,res) => {

    const blogs  = await blog.create({
         id : req.body.id,
        topic : req.body.topic , 
        description: req.body.description, 
        posted_at: req.body.posted_at ,
        posted_by : req.body.posted_by
    });
    res.json ({
        status : "success",
        blogs
    })
})

app.get('/blog' , async(req,res) => {
    let page = req.query.page;
    let topic = req.query.topic;

    let articles = await blog.find();

    // Return the articles to the rendering engine
    res.json({
        articles
    });      
})

app.put("/blog/:id", async (req,res) => {

    try {
        const data = await blog.updateOne({_id:req.params.id},{topic : req.body.topic, description: req.body.description, posted_at: req.body.posted_at, posted_by : req.body.posted_by});
        res.json({
            status : "success",
            data
        })
    } catch(e) {
        res.status(500).json({
            status: "failed",
            message : e.message
        })
    }
})

app.delete("/blog/:id", async (req,res) => {
    console.log(req.params)
    let data = await blog.deleteOne(req.params)
    res.status(200).send({
        
        status: "success",
        result: data 
    }) 
})



app.listen(3000, () => {
    console.log("listening")
})

