const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "/images",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myImage");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use('/images', express.static('/images'))
// app.get('/images/:imageName', (req, res) => {
//     // do a bunch of if statements to make sure the user is 
//     // authorized to view this image, then
  
//     const imageName = req.params.imageName
//     const readStream = fs.createReadStream(`images/${imageName}`)
//     readStream.pipe(res)
//   })

//   app.post('/api/images', upload.single('image'), (req, res) => {

  
//     // Save this data to a database probably
  
//     console.log(description)
//     res.send({description})
//   })



mongoose
.connect("mongodb://localhost:27017/testDB")
.catch((err) => console.log(err));

const postSchema = mongoose.Schema({
    title: String,
    shift: String,
    george: String,
    horacio: String,
    freddie: String,
    rafaela: String,
    catalina: String,
    ranulfo: String,
    james: String,
    gabe: String,
    john: String,
    bruce: String,
    vincent: String,
    bam: String,
    yoshiko: String,
    josh: String,
})

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    res.send("Express is here");
})

app.post("/create", (req, res) => {
    Post.create({
        title: req.body.title,
        shift: req.body.shift,
        george: req.body.george,
        horacio: req.body.horacio,
        freddie: req.body.freddie,
        rafaela: req.body.rafaela,
        catalina: req.body.catalina,
        ranulfo: req.body.ranulfo,
        james: req.body.james,
        gabe: req.body.gabe,
        john: req.body.john,
        bruce: req.body.bruce,
        vincent: req.body.vincent,
        bam: req.body.bam,
        yoshiko: req.body.yoshiko,
        josh: req.body.josh,

    }).then(doc => console.log(doc))
    .catch(err => console.log(err))
})

app.get("/posts", (req, res) => {
    Post.find()
        .then((items) => res.json(items))
        .then((err) => console.log(err))
    });

app.delete("/delete/:id", (req, res) => {
    Post.findByIdAndDelete({_id: req.params.id})
    .then((doc) => console.log(doc))
    .then((err) => console.log(err));
})


app.listen(3001, function() {
    console.log("Server is running");
})