import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks";
import { auth } from "../services/firebaseConfig";

 export function Login() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
     
     function handleSignIn(e) {
         e.preventDefault();
         createUserWithEmailAndPassword(email, password);
     }
     if(loading) {
         return <p>carregando...</p>;
     }
     
 }

document.getElementById('button-login').addEventListener('click', function() {
    // Redirecionar para a página desejada
    window.location.href = '/';
});


