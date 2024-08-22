const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Inicializa o Firebase
const serviceAccount = require('../serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-users-guia-canino-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Rota para exibir o formulário
router.get('/', (req, res) => {
    res.render('login');
});

// Rota para adicionar usuário ao Firebase
router.post('/add-user', (req, res) => {
    const { username, email } = req.body;
    const ref = db.ref('users').push();

    ref.set({
        username: username,
        email: email
    })
    .then(() => {
        res.send('Usuário adicionado com sucesso!');
    })
    .catch((error) => {
        res.send('Erro ao adicionar usuário: ' + error);
    });
});

module.exports = router;
