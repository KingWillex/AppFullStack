
const express = require('express');
const { MongoClient } = require('mongodb');
const mustache = require('mustache');
const _ = require('lodash');
// Create an instance of Express
const app = express();

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://willexofficial:<db_password>@project.vc0sa.mongodb.net/?retryWrites=true&w=majority&appName=project';


// Create a MongoDB client
const client = new MongoClient(mongoURI);

// Middleware to parse JSON
app.use(express.json());

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });



client.connect()
.then(() => {
  console.log('MongoDB connected...');
  const db = client.db('FullStack-SubjectCatalog'); // database name 
  const collection = db.collection('Subjects'); // collection name

  // Define a simple route
  app.get('/website', (req, res) => {
      res.send('Hello World');
  });

  // get and post methods===============================================================

  // Define a POST route to insert data into MongoDB
  app.post('/data', (req, res) => {
      const data = req.body; // Get data from the request body
      collection.insertOne(data) // Insert data into the collection
      .then(result => {
          res.status(201).send({ message: 'Data inserted', id: result.insertedId });
      })
      .catch(error => {
          console.error('Error inserting data:', error);
          res.status(500).send('Error inserting data');
      });
  });
});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
