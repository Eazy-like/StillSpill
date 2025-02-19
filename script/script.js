document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Placeholder - No server interaction in this static version
        alert("Sign up successful! (No server-side logic in this prototype)");
        window.location.href = 'vent.html'; // Redirect (even without server confirmation)

    });
});
