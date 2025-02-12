let selectedImage = "";


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("caller-image").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            console.log("✅ File selected:", file.name); // Debug log
    
            const reader = new FileReader();
            reader.onload = function (e) {
                console.log("✅ Image loaded:", e.target.result); // Debug log
                document.getElementById("caller-image-preview").src = e.target.result;
                selectedImage = e.target.result; // Store the image globally
                console.log("✅ selectedImage set to:", selectedImage); // Debug log
            };
            reader.readAsDataURL(file);
        } else {
            console.log("❌ No file selected");
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
    let callTimerInterval; // Variable to store the timer interval

    function scheduleFakeCall() {
        const callerName = document.getElementById("caller-name").value || "Unknown";
        const callTime = parseInt(document.getElementById("call-time").value) * 1000 || 5000;
    
        const callerNameElement = document.getElementById("fake-caller-name");
        const callerImageElement = document.getElementById("fake-caller-image"); // Get the image element
    
        if (!callerNameElement || !callerImageElement) {
            console.error("Error: Elements 'fake-caller-name' or 'fake-caller-image' not found");
            return;
        }
    
        // Set the caller name
        callerNameElement.innerText = callerName;
    
        // Set the caller image
        if (selectedImage) {
            console.log("✅ Setting caller image to:", selectedImage); // Debug log
            callerImageElement.src = selectedImage; // Use the globally stored image
        } else {
            console.log("❌ No image selected"); // Debug log
            callerImageElement.src = ""; // Clear the image if none is selected
        }
    
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
    
    
    // Add event listeners after elements are created
    document.getElementById("accept-call").addEventListener("click", acceptFakeCall);
    document.getElementById("reject-call").addEventListener("click", rejectFakeCall);
    
    function acceptFakeCall() {
        console.log("✅ Accept button clicked");
        let timer = 0; 
        const timerElement = document.getElementById("fake-caller-name");
        timerElement.innerText = "Call Started...";
    
        // Start the call timer
        callTimerInterval = setInterval(() => {
            timer++;
            let minutes = Math.floor(timer / 60);
            let seconds = timer % 60;
            timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }, 1000);
    }
    
    function rejectFakeCall() {
        console.log("❌ Reject button clicked");
        alert("Call Rejected!");
        clearInterval(callTimerInterval); 
        document.getElementById("fake-call-screen").style.display = "none"; 
    }
    
    function endFakeCall() {
        clearInterval(callTimerInterval); // Stop the timer
        const fakeCallScreen = document.getElementById("fake-call-screen");
        if (fakeCallScreen) {
            fakeCallScreen.remove(); // Remove the fake call screen
        }
    }
    

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
