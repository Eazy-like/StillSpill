// Get elements
const submitVentButton = document.getElementById("submitVent");
const micButton = document.getElementById("micButton");
const ventInput = document.getElementById("ventInput");

// "Done Venting" button click handler
submitVentButton.addEventListener("click", function () {
    const ventText = ventInput.value;

    // 1. Client-Side Validation (Important!)
    if (ventText.trim() === "") { // Check if the textarea is empty or just whitespace
        alert("Please enter your vent before submitting.");
        return; // Stop further execution
    }

    // 2. Send data to server (using fetch as an example - Adapt as needed)
    fetch('/saveVent', { // Replace '/saveVent' with your actual server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vent: ventText })
    })
    .then(response => {
        if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
            return response.json().then(err => {throw new Error(err.message || "Server error")}); // Throw error with message
        }
        return response.json(); // If response is ok, parse JSON
    })
    .then(data => {
        if (data.success) {
            window.location.href = "pages/reflection.html"; // Redirect on success
        } else {
            alert(data.message || "An error occurred while saving your vent."); // Display server error message
        }
    })
    .catch(error => {
        console.error("Error saving vent:", error);
        alert("A network error occurred. Please try again later."); // User-friendly error message
    });
});


// Speech Recognition
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) { // Check for both prefixes
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition(); // No need for 'new' keyword

    recognition.continuous = false; // Usually don't need continuous for short vents
    recognition.lang = "en-US"; // Set language explicitly

    micButton.addEventListener("click", function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        ventInput.value += transcript + " "; // Append with space
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error); // Log to console for debugging
        let errorMessage;
        switch (event.error) {
            case 'no-speech':
                errorMessage = 'No speech was detected. Please try again.';
                break;
            case 'audio-capture':
                errorMessage = 'No audio input available.';
                break;
            case 'not-allowed':
                errorMessage = 'Speech recognition permission denied. Please allow access to your microphone.';
                break;
            case 'aborted':
                errorMessage = 'Speech recognition aborted.';
                break;
            default:
                errorMessage = 'An error occurred during speech recognition.';
        }
        alert(errorMessage); // More user-friendly error messages
    };
} else {
    micButton.style.display = "none"; // Hide if not supported
    console.warn("Speech Recognition not supported in this browser."); // Log to console
}
