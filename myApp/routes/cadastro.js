const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') //isso serve pra efetuar a criptografia, nao deletar

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

router.get('/', function(req, res) {
  res.render('cadastro')
})

//const admin = require('firebase-admin');

// Inicializa o Firebase
const serviceAccount = require('../service.json');
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-users-guia-canino-default-rtdb.firebaseio.com"
});

const db = admin.database();

*/

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log("DC");

// Rota para adicionar usuário ao Firebase
router.post('/add', async (req, res) => {
  console.log("ADD acessado");
  const { email, pass } = req.body;
  const ref = await db.collection('users').doc('a');

  await ref.set({
      email: email,
      pass: pass
  })
  .then(() => {
    res.send('Usuário adicionado com sucesso!');
    console.log("ok")
  })
  .catch((error) => {
    res.send('Erro ao adicionar usuário: ' + error);
    console.log("no")
  });
  
});


/*

// Handle registration form submissions
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const usersCollection = req.mongoClient.db('db').collection('col');

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // esse hash vai deixar mais seguro

    // Save the user with the hashed password
    await usersCollection.insertOne({ name, password: hashedPassword });

    // Redirect to the login page or main menu page
    res.redirect('/login'); // tbm podia ser o main menu
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

*/

module.exports = router;