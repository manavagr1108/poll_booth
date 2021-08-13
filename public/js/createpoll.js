let socket=io();
    socket.on('connect',()=>{
        console.log('connected to server')
    })    
    socket.on('disconnect',()=>{
        console.log('disconnected from server')
    })

let users=[];
let disp_can=[];
let candidates_store= [];
var index=0;
var temp=1;
var num;
function addcandidate()
{
    let name = users.map(user => `<li>${user}</li>`).join('\n');
    document.querySelector('ul').innerHTML= name;
}


// let no_poll = document.getelementById('nopoll');
let btn = document.querySelector('#create')
let addbtn = document.querySelector('#add')
let createbtn = document.querySelector('#createpoll')
let nopoll = document.querySelector('#nopoll')
let endbtn = document.querySelector('#end')

btn.addEventListener('click',()=>{ 
    num = nopoll.value;
    index=nopoll.value;
    console.log(nopoll.value);
    socket.emit('no_poll',{
        val : nopoll.value
    })
})
addbtn.addEventListener('click',()=>{ 
    if(index>0)
   {users.push(candidates.value);
   candidates.value ='';
   addcandidate();
   
    index--;
    }
})



createbtn.addEventListener('click',()=>{ 
    if(index==0 && temp ==1)
   {
    // console.log('created')
    for (let i = 0; i < num; i++) {
        candidates_store[i]={};
        disp_can[i] = document.createElement('h3');
        disp_can[i].innerHTML = users[i] + ':' + 0;
        console.log('hello')
        document.body.appendChild(disp_can[i]);
    }
    socket.emit('candidates',{
        array : users,
        votes : 0
        })
    temp--;
    }
})

endbtn.addEventListener('click',()=>
{
    let max = candidates_store[0].votes;
    let max_name = candidates_store[0].label;
    for (let i = 1; i < num; i++){
        if(candidates_store[i].votes > max)
        {
            max = candidates_store[i].votes;
            max_name = candidates_store[i].label;
        }
    }
    socket.emit('endpoll',{
        label: max_name,
        votes: max,
        time: new Date().getTime
    })
    console.log(candidates_store);
})

socket.on('results',(candidates)=>{
    for (let i = 0; i < num; i++)
    {
        candidates_store[i].votes = candidates[i].votes;
        candidates_store[i].label = candidates[i].label;
        disp_can[i].innerHTML = users[i] + ':' + candidates[i].votes; 
        console.log(disp_can[i].innerHTML)
    }

})