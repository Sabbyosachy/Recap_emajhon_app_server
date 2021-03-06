const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT||5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.edakp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      
    const database = client.db("Supper_Shop");
    const productsCollection = database.collection("Iteams");
      
    //Get Api
    app.get('/products',  async(req, res) => {
        const cursor = productsCollection.find({});
        const products=await cursor.toArray();
        res.send(products)
        
    })
}
     finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})