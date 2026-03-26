function placeOrder(){
    return new Promise((resolve , reject) =>{
        setTimeout (()=>{
            let orderPlaced = Math.random() > 0.5 ? "confirmed" : "failed" ;
            if(orderPlaced === "confirmed"){
                resolve("order placed");
            }
            else{
                reject("order not placed");
            }
        },2000)
    })
}
function makePayment(){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
           resolve("Payment successfull");
        },2000)
    })
}

async function orderProcess(){
    console.log("processing....");
    try{
        let order = await placeOrder();
        console.log(order);
        let payment = await makePayment();
        console.log(payment);
        console.log("Order Confirmed");
    
    }
    catch(err){
        console.log(err);
        console.log("Place your order again");
    }
}
orderProcess();