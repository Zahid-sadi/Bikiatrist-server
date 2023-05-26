const express = require('express'); 
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();


app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER);




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2hres75.mongodb.net/?retryWrites=true&w=majority`;
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
    const services = client.db('bikiatrist').collection('service');
    const orders = client.db('bikiatrist').collection('orders')

    app.get('/services', async(req,res)=>{
        const cursor  = services.find();
        const result = await cursor.toArray();
        res.send(result)
    });

    app.get('/services/:id', async(req, res)=>{
        const id  = req.params.id;
        const query = {_id: new ObjectId(id)};

        const service = await services.findOne(query);
        res.send(service);
    });

    // orders api 

    app.post('/orders', async(req, res )=>{
      const order = req.body;
      const result = await orders.insertOne(order);
      res.send(result)

    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req ,res )=>{
    res.send('bikiatrist server is  running')
})


app.listen(port, ()=>{
    console.log(`bikiatrist is runnnig on ${port}`);
})