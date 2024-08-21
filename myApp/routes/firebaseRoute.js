const express = require('express');
const router = express.Router()


const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


// Inicializa o app do Firebase
const serviceAccount = require('../serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://auth-users-guia-canino-default-rtdb.firebaseio.com"
});

const db = getFirestore();

router.get('/', async(req, res) => {

  const email = res.params.get("email"); 

  console.log(email);
  console.log("A")
  //const pass = req.params.pass;

  // Add a new document with a generated id.
  try {
    res = await db.collection('teset').add({
      email: `${email}`,
      //pass: pass
    });

    console.log('Added document with ID: ', res.id);
  } catch (err) {
    res.status(500).send(err);
  }
  
  /*
  //const ref = db.ref('users').push();
  const data = {
    email: email,
    pass: pass
  }

  try {
    const ress = await db.collection('users').doc('users').set(data);
    res.send("user :"+ ress +"/ Adicionado com sucesso");
  } catch (err) {
    res.status(500).send(err);
  }
  */
  
  
  /*
  ref.set({
      email: email,
      pass: pass
  })
  .then(() => {
      res.send('Usuário adicionado com sucesso!');
  })
  .catch((error) => {
      res.send('Erro ao adicionar usuário: ' + error);
  });
  */
  
});
// Rota para adicionar usuário ao Firebase
router.post('/add-user', (req, res) => {
  const { email, pass } = req.body;
  const ref = db.ref('users').push(); // Cria um novo nó para o usuário

  ref.set({
      email: email,
      pass: pass
  })
  .then(() => {
      res.send('Usuário adicionado com sucesso!');
  })
  .catch((error) => {
      res.send('Erro ao adicionar usuário: ' + error);
  });

  /*
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
  */
});

module.exports = router;
