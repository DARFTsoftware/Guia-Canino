const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('login')
})

//const { initializeApp } = require("firebase-admin/app");
const firebase = require('firebase/app');
require('firebase/firestore');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")


require("../scr/models/dao/fireDAO.js")

const firebaseConfig = {
  apiKey: "AIzaSyAlJRuOMmhX7-23HqK8-4zwyBOVB2BtL8M",
  authDomain: "aaa01-6d50e.firebaseapp.com",
  databaseURL: "https://aaa01-6d50e-default-rtdb.firebaseio.com",
  projectId: "aaa01-6d50e",
  storageBucket: "aaa01-6d50e.appspot.com",
  messagingSenderId: "112590453924",
  appId: "1:112590453924:web:7bd30c395f9acd418ffa31",
  measurementId: "G-MXFNG40JJJ"
};

const app = initializeApp(firebaseConfig);

router.post('/', async (req, res) => {
  const { email, pass } = req.body;

  const auth = getAuth();
  const firestore = getFirestore();

  try {
    // Faz a busca no Firestore pela coleção 'arquivos' onde o campo 'nome' é igual ao valor buscado
    const arquivosRef = firestore.collection('user');
    const snapshot = await arquivosRef.where('email', '==', email).get();

    if (snapshot.empty) {
      console.log('Nenhum arquivo encontrado com esse nome.');
      return
    }

    let resultados = [];
    snapshot.forEach(doc => {
      resultados.push({ id: doc.id, ...doc.data() });
    });

    // Retorna os arquivos encontrados
    console.log(json(resultados));
  } catch (error) {
    console.log('Erro ao buscar arquivos:', error);
  }
  /*
  db.collection('user').where('email', '==', email).get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log('Nenhum usuário encontrado');
        return;
      }

      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Erro ao buscar documento', err);
    });
  */
  
  console.log("email :"+ email + " && pass:" +  pass);

  /*
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => { 
      console.log('Login realizado com sucesso!');
      const user = userCredential.user;
      res.redirect("/perfil")
  })
  .catch((error) => {
    console.log(error);
    const errorcode = error.code;
    if(errorcode==='auth/invalid-credential') {
      firer.errorr(".wrong-pass","Email ou senha inválidos");
    }
    else {
      console.log('Erro ao fazer login ' + error);
      console.log('Erro ao fazer login ' + errorcode);
    }
  })
  */

});

module.exports = router;

/*

// OAuth?

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { OAuth2Client } = require('google-auth-library');
const oauth2Client = new OAuth2Client()

const app = express();

// Enable CORS for all routes
app.use(cors());
  app.post('/auth', async (req, res) => {
    try {
      const code = req.headers.authorization;
      console.log('Authorization Code:', code);

      // Exchange the authorization code for an access token
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: '58730156701-d27fqgjb0.apps.googleusercontent.com',
          client_secret: 'GOCSPX-u02eNiucPXxRAsQVi',
          redirect_uri: 'postmessage',
          grant_type: 'authorization_code'
        }
      );
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);

      // Fetch user details using the access token
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const userDetails = userResponse.data;
      console.log('User Details:', userDetails);

      // Process user details and perform necessary actions

      res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
  });


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
*/