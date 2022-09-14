const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/blogs')

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    id : {type : Number, unique : true},
    topic: {type : String, required: true},
    description: {type : String, required: true},
    posted_at: {type : Date, required : true},
    posted_by: {type: String, required : true }
})

const blogs = mongoose.model('Blogs', blogSchema)

module.exports = blogs