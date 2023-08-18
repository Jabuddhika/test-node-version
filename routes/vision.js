var express = require('express');
var router = express.Router();
var env=require('dotenv'); //use the dotenv package to get variables which are in the env file
var cors=require('cors');  //use the cors package to set the cors policy
const {json} = require("express");
const  imageService  = require("../service/imageclassifyservice");  //export the image service instance from service layer

router.use(json());
router.use(cors());
env.config();

router.post('/classify', async function(req, res, next) {

    const imageBuffer = await req.files.file.data;   // attempt to detect file

    if (!req.files.file.data) {
        return res.status(404).json({ error: 'No file provided' });   //error handle for the file when file is not found
    }


    try {
        const labels = await imageService.detectImages(imageBuffer);   // attempt to detect labels via detectLabels function in the class of service layer
        res.json({ "labels": labels });      // respond with detected labels
    } catch (error) {
        console.error('Error detecting labels:', error);
        res.status(500).json({ error: 'Cant detect the labels' });   // respond with error message when cant get labels
    }

});


module.exports = router;

