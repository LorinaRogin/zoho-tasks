let pwd = document.querySelector("#password");
let msg = document.querySelector("#msg");
pwd.onfocus = function(){
    msg.textContent = "Input is focused!";
}