document.addEventListener("DOMContentLoaded", function () {
    // Handle caller image upload
    document.getElementById("caller-image").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("caller-image-preview").src = e.target.result;
                document.getElementById("fake-caller-image").src = e.target.result; // ✅ Set image in fake call screen
            };
            reader.readAsDataURL(file);
        }
    });
    

    // Handle ringtone upload
    document.getElementById("ringtone").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const audio = document.getElementById("fake-ringtone");
                if (audio) {
                    audio.src = e.target.result;
                } else {
                    console.error("Error: 'fake-ringtone' element not found");
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // // Decline call functionality
    // document.getElementById("decline-call").addEventListener("click", () => {
    //     document.getElementById("fake-call-screen").style.display = "none";
    //     document.getElementById("fake-ringtone").pause();
    // });

    // // Accept call functionality
    // document.getElementById("accept-call").addEventListener("click", () => {
    //     alert("Call accepted (Fake)");
    //     document.getElementById("fake-call-screen").style.display = "none";
    //     document.getElementById("fake-ringtone").pause();
    // });

    // Function to schedule fake call
    function scheduleFakeCall() {
        const callerName = document.getElementById("caller-name").value || "Unknown";
        const callTime = parseInt(document.getElementById("call-time").value) * 1000 || 5000;

        const callerNameElement = document.getElementById("fake-caller-name");
        if (!callerNameElement) {
            console.error("Error: Element 'fake-caller-name' not found");
            return;
        }
        callerNameElement.innerText = callerName;

        console.log("Call scheduled in:", callTime / 1000, "seconds");

        setTimeout(() => {
            console.log("Call triggered!");
            const callScreen = document.getElementById("fake-call-screen");
            if (callScreen) {
                callScreen.style.display = "block";
            } else {
                console.error("Error: 'fake-call-screen' not found");
            }

            const audio = document.getElementById("fake-ringtone");
            if (audio && audio.src) {
                console.log("Playing ringtone...");
                audio.play();
            } else {
                console.log("No ringtone selected.");
            }
        }, callTime);
    }

    // Attach event listener to schedule call button
    document.getElementById("schedule-call").addEventListener("click", scheduleFakeCall);
});
