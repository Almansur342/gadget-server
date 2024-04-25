const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// gadgetsMaster
// 5D7U5FLBGQ8Hb4Bb

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://gadgetsMaster:5D7U5FLBGQ8Hb4Bb@cluster0.skihu85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // const database = client.db("ProductDB");
    // const productCollection = database.collection("products");
    const database = client.db("ProductDB");
    const productCollection = database.collection("products");

   app.post('/addProduct', async(req,res)=>{
     const result = await productCollection.insertOne(req.body);
     res.send(result);
   });

   app.get('/myProduct/:email', async(req,res)=>{
    const email = req.params.email;
    console.log(email);
    const result = await productCollection.find({email:email}).toArray();
    res.send(result);
   })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
  res.send('hello from gadgets server');
});

app.listen(port,()=>{
console.log(`gadget is working on port: ${port}`)
})