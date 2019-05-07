const ninjaContainer = document.querySelector('#ninjas');

fetch('localhost:3000/ninjas').then(res=>{
    return  res.json();
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
}
)