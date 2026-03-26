function greet(callback){
    console.log("Hello");
    callback();
}

greet(function(){
    console.log("How are you?");
});

// ------------------------------------------------

function start(callback){
    console.log("Starting...");
    callback();
}
start(function(){
    console.log("Running...");
})

// --------------------------------------------------

function calculate(a, b, callback){
    callback(a + b);
}
calculate(5, 3, function(result){
    console.log("a + b = " + result);
});

// ----------------------------------------------
function process(callback){
    console.log("Start");
    callback();
}
process(function(){
    console.log("End")
});

// --------------------------------------------------
function sendData(callback){
    let data = "Hello";
    callback(data);
}
sendData(function(result){
    console.log(result);
})

function test(callback) {
    callback("Hi");
}

test(function (x) {
    console.log(x);
});
// ----------------------------------------------

function start(callback) {
    console.log("Ready");
    callback();
}
start(function () {
    console.log("Go!");
})
// -------------------------------------------

function giveNumber(callback) {
    let num = 5;
    callback(num);
}
giveNumber(function (result) {
    console.log("num =" + result);
})

// ------------------------------------------------
function operate(a, b, callback) {
    callback(a + b);
}
operate(12, 22, function (output) {
    console.log("Sum = " + output);
})

// ------------------------------------------------

function multiply(a, b, callback) {
    callback(a * b);
}
multiply(3, 4, function (output) {
    console.log("Product = " + output);
});

// ------------------------------------------------

function checkAge(age, callback){
    if(age >= 18){
        callback("Adult");
    }
    else{
        callback("Minor");
    }
    
}
checkAge (21 , function(output){
    console.log("Eligibility :" + output);
})

// -----------------------------------------------

function repeat(callback){
    for(let i = 0 ; i < 3 ; i++){
       callback();
    }
   
}
repeat(function(){
    console.log("Hello");
});

// ------------------------------------------------

function calculate(a, b, callback){
    callback(a - b);
};
calculate(10 , 5 , function(result){
    console.log(result);
});

// -------------------------------------------
function processText(text, callback){
    callback(text);
}
processText("Hello" , function(output){
    console.log(output.toUpperCase());
})
// --------------------------------------------
function loadData(text , callback){
    setTimeout(()=>{
        callback(text);
    }, 2000);
}
loadData("data loaded" ,function(result){
    console.log(result);
})