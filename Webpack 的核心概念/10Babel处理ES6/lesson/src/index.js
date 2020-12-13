import "@babel/polyfill"; //引入

const arr = [
    new Promise(()=>{}),
    new Promise(()=>{})
]

arr.map(item=>console.log(item))
