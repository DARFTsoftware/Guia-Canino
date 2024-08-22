 // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"
  import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAE1Uby4LmGAe8PNgmt-nIEkvOY4otW8bU",
  authDomain: "auth-users-guia-canino.firebaseapp.com",
  databaseURL: "https://auth-users-guia-canino-default-rtdb.firebaseio.com",
  projectId: "auth-users-guia-canino",
  storageBucket: "auth-users-guia-canino.appspot.com",
  messagingSenderId: "971839385029",
  appId: "1:971839385029:web:c75c07b92fb5e3541bafac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
function SignUp(){
  const auth = getAuth();
  console.log("Iniciando processo de registro...");

  auth.createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("pass").value)
  .then(function(userCredential){
    console.log("Usuário criado:", userCredential);
    alert("Seus dados foram salvos com sucesso!");
    const user = userCredential.user;

    document.getElementById("email").value = '';
    document.getElementById("pass").value = '';

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    SignUp(userRef, { email: document.getElementById("email").value });
    
  }).catch(function(error){
    console.error("Erro ao cadastrar:", error);
    alert("Falha ao cadastrar!");
  });

}



const analytics = getAnalytics(app);

document.getElementById('submitSignUp').addEventListener('click', () => {
  SignUp();
});
