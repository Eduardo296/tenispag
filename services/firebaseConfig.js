import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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


// Check if the user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        const email = user.email; // Get the logged-in user's email
        document.getElementById('user-email').innerText = `Logado como: ${email}`;
    } else {
        // No user is logged in
        document.getElementById('user-email').innerText = 'Nenhum usuário logado';

        document.getElementById('main').addEventListener('click', (e) => {
          e.preventDefault(); // Prevent the default link action
          Swal.fire({
            icon: 'error',
            title: 'Acesso Negado',
            text: 'Você precisa estar logado para acessar este produto.',
          });
        })

    }
});



document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('img');
    const content = document.getElementById('user-menu');
  
    toggleButton.addEventListener('click', () => {
      if (content.classList.contains('none')) {
        content.classList.remove('none');
      } else {
        content.classList.add('none');
      }
      document.addEventListener('click', (event) => {
        if (!content.contains(event.target) && event.target !== toggleButton) {
          content.classList.add('none');
        }
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const userElement = document.querySelector('#img');
  const userFlutuante = document.getElementById('UserFlutuante');

  // Certifica-se de que o popup esteja escondido ao carregar a página
  userFlutuante.style.display = 'none';

  userElement.addEventListener('mouseenter', function() {
      userFlutuante.style.display = 'block'; // Mostra o popup
  });

  userElement.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX; // Posição horizontal do cursor
      const mouseY = e.clientY; // Posição vertical do cursor
      
      userFlutuante.style.left = mouseX + 10 + 'px'; // Ajuste a posição horizontal
      userFlutuante.style.top = mouseY + 10 + 'px';  // Ajuste a posição vertical
  });

  userElement.addEventListener('mouseleave', function() {
      userFlutuante.style.display = 'none'; // Oculta o popup
  });
});


// Monitorar o estado de autenticação
auth.onAuthStateChanged((user) => {
  if (user) {
    // Usuário está logado
    document.getElementById('login-btn').classList.add('none');
    document.getElementById('register-btn').classList.add('none');
    document.getElementById('img').classList.remove('none');
    document.getElementById('user-email').classList.remove('none');
    document.getElementById('UserFlutuante').classList.remove('none');

    // Exibir o email do usuário logado
    document.getElementById('user-email').textContent = user.email;
  } else {
    // Usuário não está logado
    document.getElementById('login-btn').classList.remove('none');
    document.getElementById('register-btn').classList.remove('none');
    document.getElementById('img').classList.add('none');
    document.getElementById('user-email').classList.add('none');
    document.getElementById('UserFlutuante').classList.add('none');
  }
});

// Adiciona evento para abrir as páginas de login e criar conta
document.getElementById('login-btn').addEventListener('click', () => {
  window.location.href = "/ecommerce-product-page-main/html/login.html";
});

document.getElementById('register-btn').addEventListener('click', () => {
  window.location.href = "/ecommerce-product-page-main/html/criarConta.html";
});

// Função de logout
const handleLogout = () => {
  signOut(auth).then(() => {
      console.log('Usuário deslogado com sucesso.');
      // Update UI or redirect after successful logout
      document.getElementById('user-menu').classList.add('none'); // Hide user menu
      document.getElementById('login-btn').classList.remove('none'); // Show login button
      document.getElementById('register-btn').classList.remove('none'); // Show register button
      document.getElementById('img').classList.add('none'); // Hide profile image
      document.getElementById('UserFlutuante').classList.add('none'); // Hide floating user menu
      // Alerta
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Deslogado com sucesso"
      });

  }).catch((error) => {
      console.error('Erro ao deslogar: ', error);
  });
};

// Add event listener to logout button
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
      
  }
});
