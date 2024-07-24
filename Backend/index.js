const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/memeApplication").then(()=> console.log("Connected to database")).catch((err)=> console.log(err));

const Info = require('./Modules/info.js');
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (_req, _file, cb)=> {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: (_req, file, cb)=> {
        // Rename the uploaded file
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter: (_req, file, cb) => {
        // Validate file types
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG and PNG images are allowed'));
        }
    }
});

app.get('/', (_req, res) => {
    res.render('index', { title: 'Meme Application main', message: "" });
});

app.post('/api', upload.single('image'), async (req, res, _next) => {
    try {
        const file = req.file;

        if (!file) {
            const error = new Error('Please upload a file');
            error.httpStatusCode = 400;
            throw error;
        }else{

            console.log(req.file);
            let info = new Info({
                title: req.body.title,
                imgLocation: '/uploads/' + file.filename,
                description: req.body.description,
                account: 'Anonymous' 
            }); 
            await info.save();
            res.render('index', { title: 'Meme Application true', message: "File Uploaded Successfully" });
        }
    } catch (error) {
        
        if (error instanceof multer.MulterError) {
            res.status(400).render('index', { title: 'Meme Application alert 1 ', message: "" });
        } else {
            res.status(500).render('index', { title: 'Meme Application alert 2', message: 'internal server error' });
        }
    }
});
app.post('/ack/:apiKey',(req,res)=>{
    const {apiKey} = req.params;
    if(apiKey === process.env.API_KEY){
        res.status(200).json({status:"Sucess",title: 'Meme Application ack', message: "API Key is valid"});
    }else{
        res.status(400).json({status:"Sucess",title: 'Meme Application ack', message: "API Key is invalid"});
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
