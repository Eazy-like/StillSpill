document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitVent");
    const micBtn = document.getElementById("micButton");
    const ventInput = document.getElementById("ventInput");

    // Ensure elements exist before adding event listeners
    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            window.location.href = "reflection.html"; // Redirect to reflection page
        });
    }

    // Voice input feature (requires HTTPS for microphone access)
    if (micBtn) {
        micBtn.addEventListener("click", function () {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";

            recognition.onresult = function (event) {
                ventInput.value = event.results[0][0].transcript;
            };

            recognition.start();
        });
    }
});
