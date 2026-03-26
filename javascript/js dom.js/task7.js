let input = document.querySelector("#textBox");
let msg = document.querySelector("#msg");
input.onkeydown = function(){
    msg.textContent = "Typing Detected!";
}

let text = document.querySelector("#username");
let statu = document.querySelector("#status");
text.onkeydown = function (){
    statu.textContent = "User is typing....";
}