// Redirect when "Done Venting" is clicked
document.getElementById("submitVent").addEventListener("click", function () {
    window.location.href = "pages/reflection.html";
});

// Speech Recognition for Mic Button
const micButton = document.getElementById("micButton");
const ventInput = document.getElementById("ventInput");

if ("webkitSpeechRecognition" in window) {
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    micButton.addEventListener("click", function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        ventInput.value += event.results[0][0].transcript + " ";
    };

    recognition.onerror = function (event) {
        alert("Speech recognition error: " + event.error);
    };
} else {
    micButton.style.display = "none"; // Hide mic button if speech recognition is not supported
}
