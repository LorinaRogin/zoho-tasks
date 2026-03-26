function checkPassword(){
    return new Promise((resolve , reject) =>{
        setTimeout(()=>{
            let password = Math.random() > 0.5 ? "12345" : "00000";
            if (password === "12345"){
                resolve("Login success");
            }
            else{
                reject("Wrong password");
            }
        },1000)
    });
}

async function verification(){
    try{
        let verify = await checkPassword();
            console.log(verify);
        }
        catch(err){
            console.log(err);
        }
}
verification();
