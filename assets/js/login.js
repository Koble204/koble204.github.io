document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-login');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = JSON.parse(localStorage.getItem('user'));

        if (username === user.username && password === user.password) {
            alert('Login successful!');
            window.location.href = '/index.html';
        } else {
            alert('Invalid email or password !!!');
        }
    });
});