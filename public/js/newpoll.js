let socket=io();
    socket.on('connect',()=>{
        console.log('connected to server')
    })    
    socket.on('disconnect',()=>{
        console.log('disconnected from server')
    })



// let ul = document.querySelector('ul');
// const lis = ul.children;
let one_vote =1
let winner;
socket.on("up",(candidates)=>{
            // Java.innerHTML=candidates[0].votes;
            // javascript.innerHTML=candidates[1].votes;
            // c.innerHTML=candidates[2].votes;
            // Python.innerHTML=candidates[3].votes;    
})

socket.on("create",(candidates)=>{
    for (let i = 0; i < candidates.length; i++) {
        const btn = document.createElement('button');
        btn.className += candidates[i].label;
        const wait = document.createElement('div');
        wait.innerHTML += "wait for the admin to end the poll and send you the results" ;
        btn.onclick = function(){
            if(one_vote == 1)
            {
                socket.emit("vote1",i);
                one_vote--;
                document.body.appendChild(wait);
            }
        }
        btn.innerHTML += candidates[i].label;
        document.body.appendChild(btn);       
    }
})

socket.on('resultspoll',(data)=>{
    const winner = document.createElement('div');
    winner.innerHTML += "congrats " + data.label + " for winning the poll" ;
    document.body.appendChild(winner);
})

