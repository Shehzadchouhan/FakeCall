let selectedImage = "";

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("caller-image").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("caller-image-preview").src = e.target.result;
                selectedImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("ringtone").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("fake-ringtone").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    let callTimerInterval;

    function scheduleFakeCall() {
        const callerName = document.getElementById("caller-name").value.trim() || "Unknown";
        const callTime = parseInt(document.getElementById("call-time").value) * 1000 || 5000;

        document.getElementById("fake-caller-name").innerText = callerName;
        document.getElementById("fake-caller-image").src = selectedImage || "default-avatar.png"; // Default image if none selected
        
        setTimeout(() => {
            const fakeCallScreen = document.getElementById("fake-call-screen");
            fakeCallScreen.classList.add("active");

            // Play ringtone
            const ringtone = document.getElementById("fake-ringtone");
            if (ringtone) {
                ringtone.play().catch(error => console.error("Auto-play failed:", error));
            }
        }, callTime);
    }

    function acceptFakeCall() {
        let timer = 0;
        const timerElement = document.getElementById("fake-caller-name");
        timerElement.innerText = "00:00"; // Reset timer

        // Hide call buttons
        document.getElementById("accept-call").style.display = "none";
        document.getElementById("reject-call").style.display = "none";

        // Stop ringtone
        const ringtone = document.getElementById("fake-ringtone");
        if (ringtone && !ringtone.paused) {
            ringtone.pause();
            ringtone.currentTime = 0;
        }

        callTimerInterval = setInterval(() => {
            timer++;
            let minutes = Math.floor(timer / 60).toString().padStart(2, "0");
            let seconds = (timer % 60).toString().padStart(2, "0");
            timerElement.innerText = `${minutes}:${seconds}`;
        }, 1000);
    }

    function rejectFakeCall() {
        const ringtone = document.getElementById("fake-ringtone");
        if (ringtone && !ringtone.paused) {
            ringtone.pause();
            ringtone.currentTime = 0;
        }
        
        alert("Call Rejected!");
        clearInterval(callTimerInterval);
        
        const fakeCallScreen = document.getElementById("fake-call-screen");
        fakeCallScreen.classList.remove("active"); // Smooth fade-out
    }

    document.getElementById("schedule-call").addEventListener("click", scheduleFakeCall);
    document.getElementById("accept-call").addEventListener("click", acceptFakeCall);
    document.getElementById("reject-call").addEventListener("click", rejectFakeCall);

    // Dark Mode Toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Load saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Toggle mode
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

});
