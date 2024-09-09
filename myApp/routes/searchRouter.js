require('dotenv').config({ path: './keys/.env' });

const express = require('express');
const router = express.Router()
const { MongoClient } = require('mongodb');

const uri = process.env['MongoUuu'];

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("Essa é a uri: "+ uri )

client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
  const collection = client.db("Guia-Canino").collection("dogs");

  router.get('/dogs', async (req, res) => {
    try {
      const dogs = await collection.find({}).toArray();
      res.json(dogs);
      //res.toArray(dogs);
      //return await dogs.toArray()
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/tam/:t', async (req, res) => {
    try {
      const tInput = req.params.t;
      collection.find( { tamanho : tInput } ).toArray((err, docs) => {
        if (err) throw err;
        res.json(docs);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/six/:userInput', async (req, res) => {
    /*
      const query = req.query.q;
      const collection = db.collection('books');

      collection.find({ title: new RegExp(query, 'i') }).toArray((err, docs) => {
          if (err) throw err;
          res.json(docs);
      });
    */
    try {
      //db.usuarios.find({ nome: { $regex: userInput, $options: 'i' } })
      /*
      const userInput = req.params.nome;
      const dogs = await collection.find({ nome: { $regex: userInput } }).toArray();
      res.json(dogs);
      */
      const userInput = req.params.userInput;
      collection.find({ nome: { $regex: userInput } }).toArray((err, docs) => {
        if (err) throw err;
        res.json(docs);
      });
      
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/:nome', async (req, res) => {
    const nome = req.params.nome;
    try {
      const dog = await collection.findOne({ nome: nome });
      if (dog) {
        res.json(dog);
      } else {
        res.status(404).send('Dog not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
