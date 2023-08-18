const AWS=require('aws-sdk');  //get the aws sdk to set up AWS rekognition api
const env=require('dotenv');   //use the dotenv package to get variables which are in the env file

env.config();
class ImageService {

    rekognition;
    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,  //get the aws keys from resource file
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'ap-southeast-1'
        });

        this.rekognition = new AWS.Rekognition();
     }

     async detectImages(imageBuffer) {
        const params = {
            Image: {
                Bytes: imageBuffer
            },
            MaxLabels: 10,
            MinConfidence: 70
        };

        const data = await this.rekognition.detectLabels(params).promise(); // attempt to detect labels
        const labelsList = data.Labels.map(label => label.Name); //map the labels names to the array
        return labelsList;
    }


}

module.exports = new ImageService(); //export the singleton instance

