
const { response } = require('express');
const express = require('express');
//const { request } = require('http');
const cors = require('cors');
//const multer = require('multer');

const app = express();
const port = 3000;


const corsOption = {
    origin: "http://localhost:5500",
}
app.use(cors());
//const upload = multer({dest: "./img/"});
const storage = multer.diskStorage({
    destination:"./img/",
    filename( request, file, callback){
        callback(null, file.originalname );
    }
})
const upload = multer ({ storage : storage});
app.post("/" , upload.single("avatar"), (request, response)=>{
    console.log(request.body, request.file);
    
    response.json('vielen Dank');
})

app.listen(port, ()=> console.info('server läuft!!'));
