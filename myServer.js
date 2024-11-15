const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Import cors


const app = express();
const PORT = 3000;
app.use(cors()); // Enable CORS for cross-origin requests
// Replace with your MongoDB connection string
const uri = "mongodb+srv://willexofficial:willexSTUD123@project.vc0sa.mongodb.net/?retryWrites=true&w=majority&appName=project"; // Adjust as necessary
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.get('/api/data', async (req, res) => {
    try {
        const database = client.db('data'); //  database name
        const collection = database.collection('product'); // Rcollection name

        const data = await collection.find({}).toArray(); // Fetch all documents
        res.json(data); // Send the data as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});
 
app.get('/collections/:product', function(req, res, next) {
   req.collection.find({}).toArray(function(err, results) {
   if (err) {
   return next(err);
   }
   res.send(results);
   });
  });



app.post('/api/data/cart', async (req, res) => {
  try {
      const database = client.db('data'); //  database name
      const collection = database.collection('product'); // collection name

      const data = await collection.find({}).toArray(); // Fetch all documents
      res.json(data); // Send the data as a JSON response
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving data');
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB(); // Connect to the database when the server starts
});