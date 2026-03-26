function outer(){
    let name = "Lor";

    function inner(){
        console.log(name);
    }

    return inner;
}

let fn = outer();
fn();

// ----------------------------------------

function counter(){
    let count = 0;

    return function(){
        count++;
        console.log(count);
    }
}

let a = counter();
let b = counter();

a();
a();
b();
b();

// ---------------------------------

function outer(){
    let x = 10;

    function inner(){
        console.log(x);
    }

    inner();
}

outer();