let countries = document.querySelector("#countries");
let getImageElement = document.querySelector('#imageId');


countries.addEventListener("change", function () {

    let selected = countries.value;

    if (selected === "india") {
        getImageElement.src = "india.jpg"
       
    }

    else if (selected === "america") {
        getImageElement.src = "america.jpg"
    }

    else if (selected === "korea") {
        getImageElement.src = "korea.png"
    }

    else if (selected === "japan") {
         getImageElement.src = "japan.jpg"
    }
    

});
