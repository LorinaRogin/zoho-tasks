function checkUser(){
    return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            let user = Math.random() > 0.5 ? "yes" : "no";
            if(user === "yes"){
                resolve("User exists");
            }
            else{
                reject("not found")
            }

        },1000)
    })
}
function getUserData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("User data fetched");
        },2000)
    })
}
async function processUser(){
    try {
        let user = await checkUser();
        console.log(user);
        let data = await getUserData();
        console.log(data);

        console.log("Show Dashboard");

    }
    catch(err){
        console.log(err);
    }
}
processUser();