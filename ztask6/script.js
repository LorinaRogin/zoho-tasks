let title = document.querySelector(".active");
let content = document.querySelector(".hidden");

title.addEventListener("click", function () {
    content.classList.toggle("hidden");

});