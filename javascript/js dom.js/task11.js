// button counter
let counterButton = document.querySelector("#counterButton");
let counterDisplay = document.querySelector("#counterDisplay");
let count = 0;
counterButton.onclick = function () {
    count++;
    counterDisplay.textContent = count;
}

// live typing preview
let liveInput = document.querySelector("#liveInput");
let LiveOutput = document.querySelector("#liveOutput");
liveInput.onkeyup = function () {
    LiveOutput.textContent = liveInput.value;
}

// character count
let messageInput = document.querySelector("#messageInput");
let charCount = document.querySelector("#charCount");
messageInput.onkeyup = function () {
    charCount.textContent = "Characters: " + messageInput.value.length;
}

// Maximum character count
let postInput = document.querySelector("#postInput");
let postCount = document.querySelector("#postCount");
postInput.onkeyup = function () {
    if (postInput.value.length > 20) {
        postInput.value = postInput.value.slice(0, 20);
    }
    postCount.textContent = postInput.value.length + "  / 20";
}

// password strength checker
let passwordField = document.querySelector("#passwordField");
let strengthMsg = document.querySelector("#strengthMsg");
passwordField.onkeyup = function () {
    if (passwordField.value.length < 5) {
        strengthMsg.textContent = "Weak";
    }
    else if (passwordField.value.length >= 5 && passwordField.value.length <= 8) {
        strengthMsg.textContent = "Medium";
    }
    else
        strengthMsg.textContent = "Strong";
}

// toggle button
let themeToggle = document.querySelector("#themeToggle");
let darkMode = false;
themeToggle.onclick = function () {
    if (darkMode === false) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        darkMode = true;
    }
    else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        darkMode = false;
    }
}

// show / hide password feature
let loginPassword = document.querySelector("#loginPassword");
let togglePassword = document.querySelector("#togglePassword");
togglePassword.onclick = function () {
    if (loginPassword.type === "password") {
        loginPassword.type = "text";

    }
    else {
        loginPassword.type = "password";
    }
}

//  live character count
let tweetBox = document.querySelector("#tweetBox");
let charLeft = document.querySelector("#charLeft");
tweetBox.onkeyup = function () {
    tweetBox.value = tweetBox.value.slice(0,100);
    let typed = tweetBox.value.length;
    let remaining = 100 - typed;
    charLeft.textContent = "Characters left : " + remaining;
}

// like button system
let reactionBtn = document.querySelector("#reactionBtn");
let reactCount = document.querySelector("#reactCount");
let like = 0;
reactionBtn.onclick = function(){
    like++;
    reactCount.textContent = "Likes: " + like;
}

// addEvent listener
let mysteryBtn = document.querySelector("#mysteryBtn");
let mysteryMsg = document.querySelector("#mysteryMsg");
mysteryBtn.addEventListener("click",function(){
    mysteryMsg.textContent = "You discovered the secret!";
});

// classlists
let modeChanger = document.querySelector("#modeChanger");
let modeText = document.querySelector("#modeText");
modeChanger.addEventListener("click" , function(){
    modeText.classList.toggle("darkMode")
});

