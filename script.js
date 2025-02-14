document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    window.location.href = "vent.html"; // Redirect to Venting Space
});
document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector("form"); 

    if (signUpForm) {
        signUpForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            window.location.href = "vent.html"; // Redirect to venting page
        });
    }
});
