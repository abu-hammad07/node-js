// Fundamentals of JavaScript:
// arrays and objects
// functions return
// async js coding
// foreach map filter find indexOf


var arr = [1,2,3,4,5];

// forEach loop
// arr.forEach(function(val){
//     console.log(val + ' Hello');
// })

// for use the new array which is created
// var newArr = arr.map(function(val) {
//     return val*4;
// })
// console.log(newArr);

// filter method for use the new array
// const ans = arr.filter(function(vall){
//     if(vall >= 0) {return vall}
//     else{return false}
// })
// console.log(ans);

// find method for use the find value
// const ansFind = arr.find(function(val){
//     if(val === 5){return val}
//     else {return false}
// })
// console.log(ansFind);


// var obj = {
//     name: "Abu Hammad",
//     age: 21
// }
// // Object.freeze(obj);
// obj.age = 23;



// var blog = await fetch('https://randomuser.me/api/');
// var data = await blog.json();
// console.log(data);











// line by line code chale isey kahte hai synchronous
// jo bhi code async nature ka ho, usey side stack mein bhej do and
// agle code ko chalao jo bhi sync nature ka ho, jab bhi saara syn code
// chal jaaye, tab check karo ki async code complete hua ya nahi and
// agar wo complete hua ho to usey main stack mein laao and chalao

async function getData(){
    const blob = await fetch('https://randomuser.me/api/');
    const data = await blob.json();

    console.log(data.results[0]['name'].first);
    
}

getData();




// Node.js Basics:
// Introduction to Node.js.
// Installing Node.js and npm.
// Working with modules.
// File system operations.
// understanding HTTP module










