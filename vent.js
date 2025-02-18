// vent.js

document.addEventListener('DOMContentLoaded', () => {
    const submitVentButton = document.getElementById("submitVent");
    const ventInput = document.getElementById("ventInput");
    const micButton = document.getElementById("micButton");
    const playAudioButton = document.getElementById("playAudio");
    const motivationAudio = document.getElementById("motivationAudio");


    submitVentButton.addEventListener("click", () => {
        const ventText = ventInput.value;

        if (ventText.trim() === "") {
            alert("Please enter your vent before submitting.");
            return;
        }

        // Simulate server interaction (replace with your actual fetch call)
        fetch('/saveVent', { // Replace with your actual server endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vent: ventText })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {throw new Error(err.message || "Server error")});
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                window.location.href = "reflection.html";
            } else {
                alert(data.message || "An error occurred while saving your vent.");
            }
        })
        .catch(error => {
            console.error("Error saving vent:", error);
            alert("A network error occurred. Please try again later.");
        });
    });

    playAudioButton.addEventListener("click", () => {
        motivationAudio.play();
    });

    // Speech Recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.lang = "en-US";

        micButton.addEventListener("click", () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            ventInput.value += transcript + " ";
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
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
            alert(errorMessage);
        };
    } else {
        micButton.style.display = "none";
        console.warn("Speech Recognition not supported in this browser.");
    }
});
