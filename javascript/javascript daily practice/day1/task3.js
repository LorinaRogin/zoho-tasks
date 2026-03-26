let arr = [12, 45, 7, 89, 23];
let max =  arr[0];
for(let i = 1 ; i < arr.length ; i++){
    if(arr[i] > max){
        max = arr[i];
    }
}
console.log(max);
