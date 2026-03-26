function checkUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let sucess = Math.random() > 0.5 ;
            if (sucess) {
                resolve("User exists");
            }
            else {
                reject("User not found");
            }
        }, 1000);
    })
}
function getUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let sucess = Math.random() > 0.5 ;
            if(sucess){
                resolve("User data Fetched");
            }
            else{
                reject("Error fetching user data");
            }
           
        }, 2000);
    })
}

function makePayment(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Payment Successfull");
        },1000)
    })
}
async function processApp(){
    try{
        let user = await checkUser();
        console.log(user);
        let data = await getUserData();
        console.log(data);
        let payment = await makePayment();
        console.log(payment);
        console.log("Welcome to the DashBoard");

    }
    catch(err){
        console.log(err);
        if(err === "Error fetching user data"){
            console.log("Cannot proceed without user data");
        }
    }
}
processApp();