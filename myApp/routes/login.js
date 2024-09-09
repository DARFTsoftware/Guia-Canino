const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('login')
})

//const { initializeApp } = require("firebase-admin/app");
const firebase = require('firebase/app');
require('firebase/firestore');

const { initializeApp, applicationDefault, cert } = require('firebase/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase/firestore');
const { doc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');


//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")

const appp = require("../routes/cadastro")

//const app = initializeApp(firebaseConfig);

router.get('/getUser/:email', async (req, res) => {

  try {
    
    const email = req.params.email;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const a = false;
    querySnapshot.forEach((doc) => {
      a == true
      return res.json(doc.data());  
    });

    if(!a) {
      return res.json("User not found");
    }
    
   
    // TESTE DE GET DATA
    
    /*
    // get data whit the doc name
    const docRef = doc(db, "user", "1IDW8k38MSSngKqY9FFUIetoBoD3");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    */

    /*
    // Get all data from the "users" collection
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      console.log(doc.id, " => ", doc.data().email);
     
    });
    */
  } catch(error) {
    console.log("catched error :" + error)
  }
  
})

router.post('/get', async (req, res) => {
  const { email, pass } = req.body;
  
  const auth = getAuth();
  const firestore = getFirestore()

  console.log("email :"+ email + " && pass:" +  pass);

  // Bloco 01
  try {
    /*
    // get a req element in the docs of the collection
    const userRef = firestore.collection('user');
    const snapshot = await userRef.where('email', '==', email).get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    } 
    */ 

    /*
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    */

    
    // get the entire collection
    const userRef = firestore.collection('user');
    const snapshot = await userRef.get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    
  } catch(error) {
    console.log("catched error " + error)
  }

  // Bloco 02
  /*
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => { 
      console.log('Login realizado com sucesso!');
      const user = userCredential.user;
      console.log("user: " + user)
      res.redirect("/perfil")
  })
  .catch((error) => {
    console.log(error);
    const errorcode = error.code;
    if(errorcode==='auth/invalid-credential') {
      console.log("Email ou senha inválidos");
    }
    else {
      console.log('Erro ao fazer login error:' + error);
      console.log('Erro ao fazer login errorcode:' + errorcode);
    }
  })
    */

  /*
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    */
})

router.post('/', async (req, res) => {
  const { email, pass } = req.body;

  const auth = getAuth();
  const firestore = getFirestore();

  try {
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.json(doc.data());
    });

    const a = false;

    querySnapshot.forEach((doc) => {
      if(doc.exists) {
        a == true
        return res.json(doc.data());  
      } 
    });

    if(a == false) {
      return res.json("User not found");
    }

    console.log("email :"+ email + " && pass:" +  pass);

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => { 
        console.log('Login realizado com sucesso!');
        //const user = userCredential.user;
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

    
  } catch(error) {
    console.log("catched error → " + error)
  }

  
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