// onclick
let button = document.querySelector("#btn");
let msg = document.querySelector("#msg");

button.onclick = function () {
    msg.textContent = "Button Clicked!";
}

let btn = document.querySelector("#colorBtn");
let text = document.querySelector("#text");

btn.onclick = function () {
    text.style.color = "blue";
}
// ondblclick
let btn1 = document.querySelector("#dblBtn");
let txt = document.querySelector("#message");
btn1.ondblclick = function () {
    txt.textContent = "You Double clicked!";
}

let boxbtn = document.querySelector("#boxBtn");
let box = document.querySelector("#box");
boxbtn.ondblclick = function () {
    box.style.backgroundColor = "yellow";
}

// onmouseover
let hoverMessage = document.querySelector("#hoverMessage");
hoverMessage.onmouseover = function () {
    hoverMessage.style.color = "green";
}

let magicText = document.querySelector("#magicText");
magicText.onmouseover = function () {
    magicText.style.fontSize = "40px";
}
// onmouseout
let leaveZone = document.querySelector("#leaveZone");
leaveZone.onmouseout = function () {
    leaveZone.style.color = "purple";
}

// onkeydown
let typingField = document.querySelector("#typingField");
let typingStatus = document.querySelector("#typingStatus");
typingField.onkeydown = function () {
    typingStatus.textContent = "User is typing...";
}

// onfocus
let secureInput = document.querySelector("#secureInput");
let focusNotice = document.querySelector("#focusNotice");
secureInput.onfocus = function(){
    focusNotice.textContent = "Password field active";
}
// onblur
let emailEntry = document.querySelector("#emailEntry");
let blurMessage = document.querySelector("#blurMessage");
emailEntry.onblur = function(){
    blurMessage.textContent = "Input field inactive";
}
