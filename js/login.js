// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyhKeFhrQDAYpEI88cwou2sB35cLv7SWc",
  authDomain: "tenis-pag-9d1f6.firebaseapp.com",
  projectId: "tenis-pag-9d1f6",
  storageBucket: "tenis-pag-9d1f6.appspot.com",
  messagingSenderId: "677019999369",
  appId: "1:677019999369:web:c9644f143115a5d1397a58",
  measurementId: "G-F488Q5QEJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);


const entrar = document.getElementById('submit')
entrar.addEventListener('click', function(event){
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value

    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        Swal.fire({
            icon: 'success',
            title: 'Login realizado com sucesso!',
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
            window.location.href = window.location.href =
                '/ecommerce-product-page-main/colecao.html';
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: 'Erro de autenticação',
            text: 'Usuário ou senha incorretos!',
        });
    });
})
