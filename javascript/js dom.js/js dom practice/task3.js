function getResults(){
    return new Promise((resolve , reject) =>{
       setTimeout(()=>{
        let isResultPass = Math.random() > 0.5;
        if(isResultPass){
            resolve("Passed the sem");
        }
        else{
            reject("Failed the sem");
        }
       },2000)
    });
}
// getResults()
// .then((res)=>console.log(res))
// .catch((err)=>console.log(err));

async function showResult(){
    try{
        let res = await getResults();
        console.log(res);
        if(res === "passed the exam"){
            console.log("Go to next Sem");
        }
        
    }
    catch(err){
        console.log(err);
        console.log("Write arrear exam");
    }
}
showResult();