// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
// *** GANTI DENGAN KONFIGURASI FIREBASE ANDA ***
const firebaseConfig = {
  apiKey: "AIzaSyADqZtzmRSMMoD_Ki9wvqSOicbMlkKZjH0",
  authDomain: "website-remaja-tempel.firebaseapp.com",
  projectId: "website-remaja-tempel",
  storageBucket: "website-remaja-tempel.firebasestorage.app",
  messagingSenderId: "9346740751",
  appId: "1:9346740751:web:4b9e69c63a3c3fc2e1a97a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Element References
const showRegisterFormButton = document.getElementById('show-register-form');
const registerForm = document.getElementById('register-form');
const registerFormSubmit = document.getElementById('register-form-submit');
const showLoginFromRegisterButton = document.getElementById('show-login-from-register');
const loginForm = document.getElementById('login-form');
const loginFormSubmit = document.getElementById('login-form-submit');
const forgotPasswordButton = document.getElementById('forgot-password');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const forgotPasswordFormSubmit = document.getElementById('forgot-password-form-submit');
const showLoginFromForgotPasswordButton = document.getElementById('show-login-from-forgot-password');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');
const loginError = document.getElementById('login-error');
const forgotPasswordError = document.getElementById('forgot-password-error');
const forgotPasswordSuccess = document.getElementById('forgot-password-success');

// Event Listeners
showRegisterFormButton.addEventListener('click', () => {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  forgotPasswordForm.style.display = 'none';
});

showLoginFromRegisterButton.addEventListener('click', () => {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  forgotPasswordForm.style.display = 'none';
});

forgotPasswordButton.addEventListener('click', () => {
  loginForm.style.display = 'none';
  forgotPasswordForm.style.display = 'block';
  registerForm.style.display = 'none';
});

showLoginFromForgotPasswordButton.addEventListener('click', () => {
  forgotPasswordForm.style.display = 'none';
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

registerFormSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = document.getElementById('register-nama').value;
  const wa = document.getElementById('register-wa').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User registered successfully
      const user = userCredential.user;
      console.log('User registered:', user);
      registerError.textContent = '';
      registerSuccess.textContent = 'Pendaftaran berhasil! Silakan login.';

      // Save additional user info to Firestore
      return setDoc(doc(db, 'users', user.uid), {
        nama: nama,
        wa: wa,
        email: email
      });
    })
    .then(() => {
      // Redirect to login form after successful registration
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Registration error:', errorCode, errorMessage);
      registerError.textContent = errorMessage;
      registerSuccess.textContent = '';
    });
});

loginFormSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User logged in successfully
      const user = userCredential.user;
      console.log('User logged in:', user);
      loginError.textContent = '';
      window.location.href = '/beranda.html'; // Redirect to beranda
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Login error:', errorCode, errorMessage);
      loginError.textContent = errorMessage;
    });
});

forgotPasswordFormSubmit.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('forgot-password-email').value;

  sendPasswordResetEmail(auth, email)
    .then(() => {
      forgotPasswordError.textContent = '';
      forgotPasswordSuccess.textContent = 'Email reset kata sandi telah dikirim ke alamat email Anda.';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Forgot password error:', errorCode, errorMessage);
      forgotPasswordError.textContent = errorMessage;
      forgotPasswordSuccess.textContent = '';
    });
});
