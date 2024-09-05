import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBNACzdVsPJn4dbrS5a0nhx8c3fAKH3vpk",
  authDomain: "teste-auth-797b1.firebaseapp.com",
  projectId: "teste-auth-797b1",
  storageBucket: "teste-auth-797b1.appspot.com",
  messagingSenderId: "1069475524768",
  appId: "1:1069475524768:web:fc455443bb148cb63e99c5",
  measurementId: "G-4Z6HHMR6HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Cadastro. Funciona :)

const signUp = document.getElementById('SubmitSignUp')
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  const name = document.getElementById('nome').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    const userData = {
      email: email,
      name: name,
      phone: phone,
      address: address,
      password: password
      
    };
    alert('Cadastro realizado com sucesso!', 'success');
    const docRef = doc(db, "user", user.uid);
    setDoc(docRef, userData).then(() => {
      window.location.href = 'log.html';
    })
    .catch((error) => {
      console.log('Error writing document: ', error);
    });
  })
  .catch((error) =>{
    const errorcode = error.code;
    if(errorcode=='auth/email-already-in-use'){
      alert('Email já cadastrado', 'error');
    }
    else{
      alert('Erro ao cadastrar', 'error');
    }
  })
});

//Login. Não funciona :(

function a() {
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
  const auth = getAuth();

  console.log("A")
  console.log(error);

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => { 
    console.log('Login realizado com sucesso!');
    const user = userCredential.user;
    alert('Usuário logado:', user);
    localStorage.setItem('loggedInUserId', user.uid);
    alert('UID salvo no localStorage:', user.uid);
    //window.location.href = 'user.html';
  })
  .catch((error) => {
    console.log(error);
    const errorcode = error.code;
    if(errorcode==='auth/wrong-password'){
      alert('Senha incorreta', 'error');
    }
    else{
      alert('Erro ao fazer login', 'error');
    }
  })
}
/*
const signIn = document.getElementById('SubmitLogin');
signIn.addEventListener('click', (event) => {
  event.preventDefault();

   console.log(error);

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
  const auth = getAuth();

  console.log("A")
  console.log(error);

  signInWithEmailAndPassword(auth, email, password).then((userCredential) => { 
    alert('Login realizado com sucesso!', 'success');
    const user = userCredential.user;
    alert('Usuário logado:', user);
    localStorage.setItem('loggedInUserId', user.uid);
    alert('UID salvo no localStorage:', user.uid);
    //window.location.href = 'user.html';
  })
  .catch((error) => {
    console.log(error);
    const errorcode = error.code;
    if(errorcode==='auth/wrong-password'){
      alert('Senha incorreta', 'error');
    }
    else{
      alert('Erro ao fazer login', 'error');
    }
  })
});*/