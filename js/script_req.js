document.addEventListener('DOMContentLoaded', function() {
    const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbzQkNArZCI_AZ6iMdJojHNnHOWzGk2c-IRGva7znNUKIcyTMgDb8kQ7f6Izw56RYJGEog/exec'; 
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');
    const welcomeBackBox = document.getElementById('welcome-back-box');
    const messageArea = document.getElementById('message-area');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    let loginAttempts = 0;
    function getCookie(name) {
      let cookieName = name + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let cookieArray = decodedCookie.split(';');
      for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') { cookie = cookie.substring(1); }
        if (cookie.indexOf(cookieName) === 0) { return cookie.substring(cookieName.length, cookie.length); }
      }
      return "";
    }
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    if (getCookie('user_logged_in') === 'true') {
        const username = getCookie('username');
        if (username && welcomeBackBox) {
            loginBox.style.display = 'none';
            signupBox.style.display = 'none';
            document.getElementById('welcome-username').textContent = username;
            welcomeBackBox.style.display = 'block';
        }
    } else {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
        if (welcomeBackBox) {
            welcomeBackBox.style.display = 'none';
        }
    }
    document.getElementById('show-signup')?.addEventListener('click', () => {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
    });
    document.getElementById('show-login')?.addEventListener('click', () => {
        signupBox.style.display = 'none';
        loginBox.style.display = 'block';
    });
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const passwordInput = e.target.previousElementSibling;
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                e.target.textContent = '🙈';
            } else {
                passwordInput.type = 'password';
                e.target.textContent = '👁️';
            }
        });
    });
    function showMessage(message, isError = false) {
        messageArea.textContent = message;
        messageArea.style.backgroundColor = isError ? '#c70000' : 'var(--moe)';
        messageArea.classList.add('show');
        setTimeout(() => { messageArea.classList.remove('show'); }, 5000);
    }
    const signupPasswordInput = document.getElementById('signup-password');
    if(signupPasswordInput) {
        signupPasswordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = checkPasswordStrength(password);
            const strengthContainer = e.target.closest('.input-group');
            const bar = strengthContainer.querySelector('.strength-bar');
            const text = strengthContainer.querySelector('.strength-text');
            bar.className = 'strength-bar'; text.className = 'strength-text'; text.textContent = '';
            if (password.length > 0) { bar.classList.add(strength.level); text.classList.add(strength.level); text.textContent = strength.text; }
        });
    }
    function checkPasswordStrength(password) {
        const has = { lower: /[a-z]/.test(password), upper: /[A-Z]/.test(password), number: /\d/.test(password), symbol: /[\W_]/.test(password) };
        if (has.lower && has.upper && has.number && has.symbol) return { level: 'kuat', text: 'Kuat' };
        if (has.lower && has.upper && has.number) return { level: 'sedang', text: 'Sedang' };
        if ((has.lower || has.upper) && has.number) return { level: 'lemah', text: 'Lemah' };
        return { level: 'lemah', text: 'Lemah' };
    }
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showMessage('Mendaftarkan akun...', false);
        const params = new URLSearchParams({
            action: 'signup',
            username: document.getElementById('signup-username').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value
        });
        fetch(googleAppScriptUrl, { method: 'POST', body: params })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('Pendaftaran berhasil! Silakan login.', false);
                signupForm.reset();
                signupBox.style.display = 'none';
                loginBox.style.display = 'block';
            } else { showMessage(data.message, true); }
        }).catch(error => showMessage('Pendaftaran gagal. Periksa koneksi atau coba lagi.', true));
    });
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        showMessage('Mencoba login...', false);
        const loginUrl = `${googleAppScriptUrl}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        fetch(loginUrl)
        .then(res => res.json())
        .then(result => {
            if (result.status === 'success') {
                showMessage('Login berhasil! Mengalihkan...', false);
                setCookie('user_logged_in', 'true', 1);
                setCookie('username', username, 1);
                window.location.href = 'sitemap.html'; 
            } else {
                showMessage(result.message, true);
                loginAttempts++;
                if (loginAttempts >= 3 && !document.querySelector('.forgot-password-link')) {
                    const buttonGroup = loginForm.querySelector('.button-group');
                    const forgotLink = document.createElement('a');
                    forgotLink.className = 'forgot-password-link';
                    forgotLink.textContent = 'Lupa password?';
                    forgotLink.onclick = () => alert('Hubungi admin via instagram.');
                    buttonGroup.appendChild(forgotLink);
                }
            }
        }).catch(error => showMessage('Gagal menghubungi server. Coba lagi.', true));
    });
});