// Create web server and API endpoints for comments
// Dependencies: express, body-parser, fs, path

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Create router
const router = express.Router();

// Set up body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Set up file paths
const commentsPath = path.join(__dirname, '../data/comments.json');

// Create GET request for comments
router.get('/', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Create POST request for comments
router.post('/', (req, res) => {
  let comments = [];
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json(comments);
        }
      });
    }
  });
});

// Export router
module.exports = router;