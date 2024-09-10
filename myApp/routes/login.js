const express = require('express')
const router = express.Router()

//const firebase = require('firebase/app');
//const { initializeApp, applicationDefault, cert } = require('firebase/app');
require('firebase/firestore');
const { getFirestore, doc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")

router.get('/', function(req, res, next) {
  res.render('login')
})

router.post('/', async (req, res) => {
  const { email, pass } = req.body;
  const auth = getAuth();
  try {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        
        console.log('Login realizado com sucesso!');
        
        const user = userCredential.user;
        
        /* Usando localStorage */
        const userID = user.uid;
        if (typeof localStorage === "undefined" || localStorage === null) {
          var LocalStorage = require('node-localstorage').LocalStorage;
          localStorage = new LocalStorage('./scratch');
          console.log()
        }
        localStorage.setItem('myFirstKey', 'myFirstValue');
        console.log(localStorage.getItem('myFirstKey'));
        localStorage.setItem('userID', userID);
        console.log('ID do usuário:', userID);

        //res.json({ userID });
        
        //res.redirect("/perfil")
      })
      .catch((error) => {
        console.log(error);
      })
  } catch(error) {
    console.log("error in post(/login) → " + error)
  }
});

router.get('/getU/:email', async (req, res) => {

  try {
    
    const email = req.params.email;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty){
      return res.json("User not found");
    }
    querySnapshot.forEach((doc) => {
      res.json(doc.data().email);  
    });
    
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

router.get('/getP/:email/:pass', async (req, res) => {

  try {
    const email = req.params.email;
    const pass = req.params.pass;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      if (doc.data().password == pass) {
        return res.json("Senha correta");
      }
      res.json("Senha incorreta");
    });
    
  } catch(error) {
    console.log("catched error :" + error)
  }

})

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