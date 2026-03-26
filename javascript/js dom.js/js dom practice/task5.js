function flipCoin(){
    return new Promise((resolve , reject) =>{
        setTimeout(()=>{
            let coinSide = Math.random() > 0.5 ? "head" : "tail";
            if (coinSide === "head"){
                resolve("It's a head")
            }
            else{
                reject("It's a tail");
            }
        },1000)
    });
};

async function showResult(){
    console.log("checking toss...")
    try{
        let res = await flipCoin();
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}
showResult();