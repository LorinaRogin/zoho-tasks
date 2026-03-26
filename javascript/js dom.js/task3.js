let button = document.querySelector("#btn");
let text = document.querySelector("#text");
button.onclick = function(){
    button.style.backgroundColor ="red";
    text.textContent = "Button Clicked !";
}
let colorBtn = document.querySelector("#colorBtn");
let para = document.querySelector("#para");
colorBtn.onclick = function(){
    para.style.color = "blue";
}