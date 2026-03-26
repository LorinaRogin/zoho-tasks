function checkAge(){
    return new Promise((resolve  , reject)=>{
        setTimeout(()=>{
            let age = 21;
            if( age >= 18){
                resolve("Eligible to Vote");
            }
            else{
                reject("Not eligible")
            }
        },2000)
    });
}
async function showResult(){
    console.log("Checking eligibility...");
    try{
        let res = await checkAge();
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}
showResult();