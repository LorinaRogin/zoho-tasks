let name = document.querySelector("#username");
let status = document.querySelector("#status");

name.onblur = function(){
    status.textContent = "Username field inactive";
}