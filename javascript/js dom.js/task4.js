let dblBtn = document.querySelector("#dblBtn");
let msg = document.querySelector("#msg");
dblBtn.ondblclick = function (){
    msg.textContent = "You have double clicked!";

}

let boxBtn = document.querySelector("#boxBtn");
let box = document.querySelector("#box");

boxBtn.ondblclick = function(){
    box.style.backgroundColor = "yellow";
}