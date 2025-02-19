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
        const callerName = document.getElementById("caller-name").value || "Unknown";
        const callTime = parseInt(document.getElementById("call-time").value) * 1000 || 5000;
    
        document.getElementById("fake-caller-name").innerText = callerName;
    
        if (selectedImage) {
            document.getElementById("fake-caller-image").src = selectedImage;
        } else {
            document.getElementById("fake-caller-image").src = "";
        }
    
        setTimeout(() => {
            document.getElementById("fake-call-screen").style.display = "block";

            const audio = document.getElementById("fake-ringtone");
            if (audio && audio.src) {
                audio.play();
            }
        }, callTime);
    }

    function acceptFakeCall() {
        let timer = 0; 
        const timerElement = document.getElementById("fake-caller-name");
        timerElement.innerText = "Call Started...";

        callTimerInterval = setInterval(() => {
            timer++;
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;
            timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }, 1000);
    }

    function rejectFakeCall() {
        alert("Call Rejected!");
        clearInterval(callTimerInterval); 
        document.getElementById("fake-call-screen").style.display = "none"; 
    }

    document.getElementById("schedule-call").addEventListener("click", scheduleFakeCall);
    document.getElementById("accept-call").addEventListener("click", acceptFakeCall);
    document.getElementById("reject-call").addEventListener("click", rejectFakeCall);

    // Dark Mode Toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
