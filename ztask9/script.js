let slides = document.querySelectorAll(".slide");
let progressBars = document.querySelectorAll(".progress");

let current = 0;
let width = 0;

setInterval(function(){

    width += 1;

    progressBars[current].style.width = width + "%";

    if(width >= 100){

        slides[current].classList.remove("active");

        current++;

        if(current === slides.length){
            current = 0;

            progressBars.forEach(bar => bar.style.width = "0%");
        }

        slides[current].classList.add("active");

        width = 0;
    }

},50);