const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4: uuidv4 } = require('uuid');
const app = express();
const port = process.env.PORT ||8080;
const mysql = require('mysql');
const dotenv = require('dotenv');
const scoketIO = require('socket.io');
const path = require('path');
const { log } = require('console');

dotenv.config({
  path:'./.env'
})
//body pareser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended:true}))
// var urlencodedparsers =bodyparser.urlencoded({ extended:false })
//uuid
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  }));

//database setup
const db= mysql.createConnection(
 { host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
  });

db.connect((error) => {
  if(error){
    console.log(error);
  }else{
    console.log('mysql connection established');
  }
})

  app.set('views','./views')
  app.set('view engine','ejs');
  app.use(express.static('public'))
  app.use(express.urlencoded({extended: false}))
  app.use(express.json());
  app.use(express.static(path.join(__dirname,'public')));
app.use('/',require('./routes/index'));
app.use('/home',require('./routes/index'));
app.use('/auth',require('./routes/auth'))


let server = http.createServer(app);
let io = scoketIO(server);
let arrlen;
const candidates1 =[]
// const candidates1 = {};

io.on("connection", (socket) => {
    
    io.sockets.emit("up", candidates1);
    // On new vote
    socket.on("vote1", (index) => {

        // Increase the vote at index
        if (candidates1[index]) {
            candidates1[index].votes += 1;
            io.emit("results", candidates1);
        }

        // Show the candidates in the console for testing
        console.log(candidates1);
        console.log('yes');

        // Tell everybody else about the new vote
        // io.sockets.emit("up", candidates1);
        
    });

    socket.on("no_poll",(data)=>{
      arrlen=data.val;
      for (let i = 0; i < arrlen; i++) {
        candidates1[i] ={};
      }
    })
    socket.on("candidates",(data)=>{
      for (let i = 0; i <arrlen; i++) {
        candidates1[i].votes= 0;
        candidates1[i].label=data.array[i];
      }
      console.log(candidates1);
      io.emit("results", candidates1);
      io.sockets.emit('create',candidates1);
    })
    socket.on("endpoll",(data)=>{
      io.sockets.emit('resultspoll', data);
      db.query('INSERT INTO results SET ?',{label: data.label, votes: data.votes, dates: data.time},(error,results)=>{
        if(error) 
        { 
            console.log(error);
        }else{
            console.log(results);
            // return res.render('signup',{mexssage:'user registered'})
        }
        })
      // db.query("SELECT * FROM results WHERE dates = ?",[data.time],(error, rows,fields)=>{
      //   console.log(data.time)
      //   return console.log(rows)
      //   })
    })
    
});

server.listen(port, () => {

    for (let i = 0; i < arrlen; i++) {
      candidates1[i] = [];    
    }
    console.log(candidates1);
    console.log(`Example app listening at http://localhost:${port}`)
  })
  