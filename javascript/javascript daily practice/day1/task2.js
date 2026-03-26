let str = "hello";
let rev = "";
for (let i = str.length - 1 ; i >= 0 ; i--){
    rev = rev + str[i];
}
console.log("Reversed string : " + rev);