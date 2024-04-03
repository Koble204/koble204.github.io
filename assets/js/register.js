document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('form-register');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        var user = {
            username: username,
            password: password
        };

        if (username === '' || password === '') {
            alert('Please fill in all fields');
            return;
        } else {

            var userJSON = JSON.stringify(user);

            localStorage.setItem('user', userJSON);
            alert('User registered successfully!');
            window.location.href = '/pages/auth.html';
        }
    });
});