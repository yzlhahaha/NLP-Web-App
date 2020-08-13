const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const https = require('follow-redirects').https;
const fs = require('fs');
// const utf8 = require('utf8');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

// Require the Aylien npm package and call textapi variable
const aylien = require("aylien_textapi");
const { json } = require('express');
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
 });

// Setting up meaningcloud api attributes
// const your_key = '7721a9c08f0c772d62a434984a6ed1d2';
const your_key = process.env.API_KEY;
const lang = 'en';
const model = 'general';

// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

// Set up routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.get('/analysis', function(req, res) {
    const temp = projectData.textcontent;
    const text = temp.replace(/\s+/g, '%20');
    const options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': `/sentiment-2.1?key=${your_key}&lang=${lang}&txt=${text}&model=${model}`,
        'headers': {
        },
        'maxRedirects': 20
    };
    var req = https.request(options, function (response) {
        const chunks = [];
    
        response.on("data", function (chunk) {
          chunks.push(chunk);
        });
    
        response.on("end", function (chunk) {
          const body = Buffer.concat(chunks);
          console.log(body.toString());
          res.json(body.toString());
        });
    
        response.on("error", function (error) {
          console.error(error);
        });
      });
      req.end();
});

/*
app.get('/analysis', function (req, res) {
    textapi.sentiment({
        "text": projectData.textcontent
      }, function(error, response) {
        if (error === null) {
          res.send(response);
        }else{
            console.log(error);
        }
      });
});
*/

let projectData = {};

app.post('/database', addDatabase);

function addDatabase(req, res) {
    projectData = req.body;
}

module.exports = app;