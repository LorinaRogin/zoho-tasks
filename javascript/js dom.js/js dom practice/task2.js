let photo = document.querySelector("#photo");
let nextBtn = document.querySelector("#nextBtn");
let prevBtn = document.querySelector("#prevBtn");
let images = [
    "apple.jpg",
    "mango.jpg",
    "grapes.jpg",
    "strawberry.jpg",
    "blueberry.jpg"
]
let currentImage = 0;
photo.src = images[currentImage];
function showNextImage(){
    currentImage++;
    if (currentImage === images.length) {
        currentImage = 0;
    }
    photo.src = images[currentImage];
    updateDots();
}
nextBtn.addEventListener("click" , showNextImage);
prevBtn.addEventListener("click", function () {
    currentImage--;
    if (currentImage < 0) {
        currentImage = images.length - 1;
    }
    photo.src = images[currentImage];
    updateDots();
});

let slider = setInterval(showNextImage,2000);
photo.addEventListener("mouseover", function () {
    clearInterval(slider);
})
photo.addEventListener("mouseout", function () {
    slider = setInterval(showNextImage,2000)
});
let dots = document.querySelector("#dots");

for(let i = 0; i < images.length ; i++){

    let dot = document.createElement("div");

    dot.classList.add("dot");

    dot.addEventListener("click",function(){

        currentImage = i;

        photo.src = images[currentImage];

        updateDots();

    });

    dots.appendChild(dot);

}

function updateDots(){

    let allDots = document.querySelectorAll(".dot");

    allDots.forEach(function(dot){
        dot.classList.remove("active");
    });

    allDots[currentImage].classList.add("active");

}

updateDots();



