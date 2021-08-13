const { urlencoded } = require('body-parser');
const express = require('express');
const router = express.Router();
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser')

const db= mysql.createConnection(
   { host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
    });

   db.connect();

app.set('views','./views')
app.set('view engine','ejs');
app.use(express.static('public'))

//temp credentials


//login page
router.get('/', (req, res) => {
    res.render('base',{title :'poll-booth'})
})

//dashboard page + checking of email and password

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/dashboard', (req, res)=>{
    if(req.session.user)
    {
       res.render('dashboard',{user:req.session.user})
    }
 })

//logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        
    })
 })

 //signup
router.post('/signup', (req, res)=>{
   res.render('signup',{message:''})
})

// new poll get request

router.get('/newpoll',(req, res)=>{
   res.render('newpoll')
})


router.get('/admin',(req, res)=>{
   res.render('admin_log');
})
router.get('/recent',(req, res)=>{
   res.render('recent');
})
module.exports = router;