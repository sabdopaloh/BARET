// Import fungsi-fungsi yang diperlukan dari Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Konfigurasi Firebase Anda (GANTI DENGAN KREDENSIAL PROYEK ANDA)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Ganti dengan API Key Anda
  authDomain: "YOUR_AUTH_DOMAIN", // Ganti dengan Auth Domain Anda
  projectId: "YOUR_PROJECT_ID", // Ganti dengan Project ID Anda
  storageBucket: "YOUR_STORAGE_BUCKET", // Ganti dengan Storage Bucket Anda
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Ganti dengan Messaging Sender ID Anda
  appId: "YOUR_APP_ID" // Ganti dengan App ID Anda
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Mendapatkan instance Firebase Auth
const db = getFirestore(app); // Mendapatkan instance Firebase Firestore

// Referensi Elemen HTML
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

// Event Listeners

// Menampilkan Formulir Pendaftaran
if (showRegisterFormButton) {
  showRegisterFormButton.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    forgotPasswordForm.style.display = 'none';
  });
}

// Kembali ke Formulir Login dari Formulir Pendaftaran
if (showLoginFromRegisterButton) {
  showLoginFromRegisterButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
  });
}

// Proses Pendaftaran
if (registerFormSubmit) {
  registerFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah form dari reload halaman
    const nama = document.getElementById('register-nama').value;
    const wa = document.getElementById('register-wa').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Membuat user baru dengan email dan password menggunakan Firebase Auth
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Pendaftaran berhasil
        const user = userCredential.user;
        console.log('User registered:', user);
        registerError.textContent = '';
        registerSuccess.textContent = 'Pendaftaran berhasil!';

        // Menyimpan data tambahan user ke Firestore
        return setDoc(doc(db, 'users', user.uid), {
          nama: nama,
          wa: wa,
          email: email
        });
      })
      .catch((error) => {
        // Menangani error pendaftaran
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration error:', errorCode, errorMessage);
        registerError.textContent = errorMessage;
        registerSuccess.textContent = '';
      });
  });
}

// Proses Login
if (loginFormSubmit) {
  loginFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Login user menggunakan Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login berhasil
        const user = userCredential.user;
        console.log('User logged in:', user);
        loginError.textContent = '';
        // Redirect ke halaman beranda (ganti dengan halaman yang sesuai)
        window.location.href = '/beranda.html';
      })
      .catch((error) => {
        // Menangani error login
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
        loginError.textContent = errorMessage;
      });
  });
}

// Proses Lupa Kata Sandi
if (forgotPasswordFormSubmit) {
  forgotPasswordFormSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-password-email').value;

    // Mengirim email reset kata sandi menggunakan Firebase Auth
    sendPasswordResetEmail(auth, email)
      .then(() => {
        forgotPasswordError.textContent = '';
        forgotPasswordSuccess.textContent = 'Email reset kata sandi telah dikirim ke alamat email Anda.';
      })
      .catch((error) => {
        // Menangani error lupa kata sandi
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Forgot password error:', errorCode, errorMessage);
        forgotPasswordError.textContent = errorMessage;
        forgotPasswordSuccess.textContent = '';
      });
  });
}

// Kembali ke Formulir Login dari Formulir Lupa Kata Sandi
if (showLoginFromForgotPasswordButton) {
  showLoginFromForgotPasswordButton.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
  });
}
