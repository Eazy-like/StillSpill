document.addEventListener('DOMContentLoaded', () => {
    const submitVentButton = document.getElementById("submitVent");
    const ventInput = document.getElementById("ventInput");
    const playAudioButton = document.getElementById("playAudio");
    const motivationAudio = document.getElementById("motivationAudio");
    const micButton = document.getElementById("micButton");

    submitVentButton.addEventListener("click", () => {
        const ventText = ventInput.value;
        if (ventText.trim() === "") {
            alert("Please enter your vent before submitting.");
            return;
        }

        // Placeholder - No server interaction in this static version
        alert("Venting submitted! (No server-side logic in this prototype)");
        window.location.href = "reflection.html";
    });

    playAudioButton.addEventListener("click", () => {
        motivationAudio.play();
    });

    // Speech Recognition (same as before)
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
