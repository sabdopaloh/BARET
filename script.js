const formTitle = document.getElementById('form-title');
const message = document.getElementById('message');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const toggleLink = document.getElementById('toggle-link');

let isLogin = true;

toggleLink.onclick = () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = 'Login';
    submitBtn.textContent = 'Login';
    toggleLink.textContent = 'Belum punya akun? Daftar';
  } else {
    formTitle.textContent = 'Daftar';
    submitBtn.textContent = 'Daftar';
    toggleLink.textContent = 'Sudah punya akun? Login';
  }
  message.textContent = '';
  usernameInput.value = '';
  passwordInput.value = '';
};

submitBtn.onclick = () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    message.textContent = 'Username dan password wajib diisi!';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users') || '{}');

  if (isLogin) {
    // Login flow
    if (users[username] && users[username] === password) {
      localStorage.setItem('loggedInUser', username);
      window.location.href = 'beranda.html';
    } else {
      message.textContent = 'Username atau password salah!';
    }
  } else {
    // Daftar flow
    if (users[username]) {
      message.textContent = 'Username sudah terdaftar, coba yang lain.';
    } else {
      users[username] = password;
      localStorage.setItem('users', JSON.stringify(users));
      message.style.color = '#7CFC00';
      message.textContent = 'Registrasi berhasil! Silakan login.';
      usernameInput.value = '';
      passwordInput.value = '';
      setTimeout(() => {
        toggleLink.click();
        message.style.color = '#f9d71c';
        message.textContent = '';
      }, 2000);
    }
  }
};
