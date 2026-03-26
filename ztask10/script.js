const salesData = [
  { product: "Laptop", quantity: 5, price: 50000, date: "2026-03-01" },
  { product: "Mouse", quantity: 12, price: 800, date: "2026-03-02" },
  { product: "Keyboard", quantity: 7, price: 1500, date: "2026-03-03" },
  { product: "Monitor", quantity: 3, price: 12000, date: "2026-03-04" },
  { product: "Printer", quantity: 2, price: 8000, date: "2026-03-05" },
  { product: "Headphones", quantity: 10, price: 2500, date: "2026-03-06" },
  { product: "Webcam", quantity: 4, price: 3500, date: "2026-03-07" },
  { product: "USB Drive", quantity: 20, price: 500, date: "2026-03-08" },
  { product: "External HDD", quantity: 6, price: 6000, date: "2026-03-09" },
  { product: "Speakers", quantity: 8, price: 4000, date: "2026-03-10" }
];

const tableHead = document.querySelector("#salesTableHead");
const tableBody = document.querySelector("#salesTableBody");

const keys = Object.keys(salesData[0]);


let headHtml = "<tr>";

for (let i = 0; i < keys.length; i++) {
  headHtml += "<th>" + keys[i] + "</th>";
}
headHtml += "<th>Action</th>";

headHtml += "</tr>";
tableHead.innerHTML = headHtml;

let bodyHtml = "";

for (let i = 0; i < salesData.length; i++) {
  const item = salesData[i];
  let rowHtml = "<tr>";

  for (let j = 0; j < keys.length; j++) {
    rowHtml += "<td>" + item[keys[j]] + "</td>";
  }
  rowHtml += "<td><span class='openFormIcon'>🖇️</span></td>";
  rowHtml += "</tr>";
  bodyHtml += rowHtml;
}

tableBody.innerHTML = bodyHtml;

const icons = document.querySelectorAll(".openFormIcon");

icons.forEach(function(icon) {
  icon.addEventListener("click", function() {
    document.querySelector("#formContainer").style.display = "block";
    document.querySelector("#overlay").style.display = "block";
  });
});

const overlay = document.querySelector("#overlay");
overlay.addEventListener("click" , function (){
  document.querySelector("#formContainer").style.display ="none";
  overlay.style.display ="none"
});

const increaseBtn = document.querySelector("#increaseBtn");
const decreaseBtn = document.querySelector("#decreaseBtn");
const quantityInput = document.querySelector("#quantityInput");


increaseBtn.addEventListener("click", function () {
  quantityInput.value = Number(quantityInput.value) + 1;
});

decreaseBtn.addEventListener("click", function () {
  if (quantityInput.value > 1) {
    quantityInput.value = Number(quantityInput.value) - 1;
  }
});
const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function () {


  const product = document.querySelector("#productSelect").value;
  const quantity = document.querySelector("#quantityInput").value;

  alert(
    "Product: " + product +
    "\nQuantity: " + quantity
  );
  alert("Order confirm");
});