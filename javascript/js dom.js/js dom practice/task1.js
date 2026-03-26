let toggleBtn = document.querySelector("#toggleBtn");
let card = document.querySelector("#card");

toggleBtn.addEventListener("click", function () {

    card.classList.toggle("show");
    if (card.classList.contains("show")) {
        toggleBtn.textContent = "Hide Card";
    } else {
        toggleBtn.textContent = "Show Card";
    }

});
