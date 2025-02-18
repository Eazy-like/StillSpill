// script.js (for sign_up.html)

document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is loaded

    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from actually submitting

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // 1. Client-Side Validation (Basic Example)
        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // 2. Simulate Server Response (Placeholder)
        const simulatedResponse = new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (replace with actual server logic)
                const success = true; // Replace with your actual validation
                if (success) {
                    resolve({ success: true, message: "Signup successful!" });
                } else {
                    reject({ success: false, message: "Signup failed. Please try again." });
                }
            }, 1000); // Simulate a 1-second delay
        });

        simulatedResponse
            .then(data => {
                if (data.success) {
                    alert(data.message); // Display success message
                    window.location.href = 'vent.html'; // Redirect to the vent page
                } else {
                    alert(data.message); // Display error message
                }
            })
            .catch(error => {
                console.error("Signup error:", error);
                alert("An error occurred during signup.");
            });
    });
});
