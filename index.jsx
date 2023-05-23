const express = require('express'); 
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());


console.log(process.env.DB_UAER);



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_UAER}:${process.env.DB_PASS}@cluster0.2hres75.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();
    const servicess = client.db('bikiatrist').collection('service');
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req ,res )=>{
    res.send('bikiatrist server is  running')
})


app.listen(port, ()=>{
    console.log(`bikiatrist is runnnig on ${port}`);
})