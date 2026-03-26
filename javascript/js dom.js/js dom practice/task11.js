function getPosts(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Posts Loaded");
        },1000);
    })
}
function getComments(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Comments Loaded");
        },2000);
    })
}
function getLikes(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("Likes loaded");
        },3000);
    })
}
async function loadDashboard(){
    let results = await Promise.all([
        getPosts(),
        getComments(),
        getLikes()
    ]);
    console.log(results);
    results.forEach(res => console.log(res));
    console.log("Dashboard ready!");
}
loadDashboard();