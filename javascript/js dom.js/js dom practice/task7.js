function downloadFile(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let finish = Math.random() > 0.5 ? "100" : "0";
            if(finish === "100"){
                resolve("Download Complete");
            }
            else{
                reject("Download Failed");
            }
        },3000)
    });
}

async function output(){
    try{
        let result = await downloadFile();
        console.log(result);
        if(result === "Download Complete"){
            console.log("File Ready");
        }
    }
    catch(err){
        console.log(err);
        console.log("Try again later");
    }
}
output()