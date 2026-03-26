let heading = document.getElementById("heading");
console.log(heading);

let paragraph  = document.getElementById("text");
console.log(paragraph);

let button = document.getElementById("btn");
console.log(button);

let title = document.getElementById("title");
console.log(title);

let para = document.getElementById("para");
console.log(para);
para.style.color = "green";
title.innerHTML = "Learning DOM";

let btn = document.getElementById("submitBtn");
console.log(btn);

// 
let head = document.getElementById("mainTitle");
console.log(head);
head.style.color = "purple";

let changeBtn = document.getElementById("changeBtn");
console.log(changeBtn);
changeBtn.innerText = "Click Me Now";

// class
let fruits = document.getElementsByClassName("fruit");
console.log(fruits);
fruits[0].style.color = "red";
fruits[1].style.color = "yellow";
fruits[2].style.color = "orange";

let cars = document.getElementsByClassName("car");
console.log(cars);
let colors = ["blue" , "red" , "pink" , "purple"];
for (let i = 0 ; i < cars.length ; i++){
    cars[i].style.color = colors[i % colors.length];
}
// tags
let headings = document.getElementsByTagName("h3");
console.log(headings);
for(let i = 0 ; i < headings.length ; i++){
    headings[i].style.color = "green";
}

// Query Selector
let id = document.querySelector("#main");
console.log(id);
id.style.color = "red";
let text = document.querySelector(".desc");
console.log(text);
text.innerHTML = "DOM is powerful";

// 
// let fruits = document.querySelector(".fruit");
// console.log(fruits);

// Query Selector all
let foods = document.querySelectorAll(".food");
console.log(foods);
for(let i = 0 ; i < foods.length ; i++){
    foods[i].style.color = "orange";
}