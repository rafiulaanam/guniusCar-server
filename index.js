const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.qdm6nzz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    
    try{
       const serviceCollection= client.db('geniusCar').collection('services')

    app.get('/services',async (req,res)=>{
        const query ={};
        const cursor = serviceCollection.find(query)
        const service = await cursor.toArray()
        res.send(service)

    })
   }
   finally{

   }

}
run().catch(error=>console.error(error))

app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(port)