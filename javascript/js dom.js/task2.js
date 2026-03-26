let heading = document.querySelector("#title");
console.log(heading);
heading.textContent = "Welcome to DOM Learning";

let box = document.querySelector("#box");
console.log(box);
box.style.color = "white";
box.style.backgroundColor = "black";
box.style.fontSize = "30px";

let para = document.querySelector("#message");
console.log(para);
para.classList.add("highlight");

let link = document.querySelector("#link");
console.log(link);
link.setAttribute("href" ,  "https://www.google.com");