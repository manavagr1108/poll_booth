const mysql = require('mysql')
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { render } = require('ejs');


const db= mysql.createConnection(
    { host: process.env.DATABASE_HOST,
     username: process.env.DATABASE_USER,
     password: process.env.DATABASE_PASSWORD,
     database: process.env.DATABASE
     });

    db.connect();

exports.register = (req,res)=>
{
    console.log(req.body);
    const {name,email,password,passwordconfirm} = req.body
    db.query("SELECT email FROM user WHERE email =? ", [email],async(error,results)=>
    {
        if(error) 
        { 
            console.log(error);
        }
        if(results>0)
        { 
            return res.render('signup',{message:'email is already registered'})
        }
        else if(passwordconfirm!=password)
        { 
            return res.render('signup',{message:"passwords dont match"})
        }

        // var hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);
        

        db.query('INSERT INTO users SET ?',{name: name, email: email, password:password},(error,results)=>{
            if(error) 
            { 
                console.log(error);
            }else{
                console.log(results);
                return res.render('signup',{message:'user registered'})
            }
        })
    })
    
}

exports.login = (req,res) => {
    // const {email, password} = req.body
    var email = req.body.email;
    var password = req.body.password;
    db.query('SELECT * FROM users WHERE email=? AND password=? ',[email,password] ,(error,rows,fields) => {     
        if(email)
        {
            if(error)
            { 
                console.log(error)
            }

            else if(rows.length > 0)
            { 
                return res.render('dashboard',{user : rows[1]})
            }   
            else
            {
                res.send('please enter crt email and password')    
            }
        }

        else{
            return res.render('base',{title:'login'})
        }
      })
}
exports.admin = (req,res) => {
    // const {email, password} = req.body
    var email = req.body.email;
    var password = req.body.password;
    if(req.body.email== 'manavagr1108@gmail.com'&& req.body.password== '123')
    {
        res.render('create_poll');
    }
    else
            {
                res.send('please enter crt email and password')    
            }
}

exports.recent = (req, res)=>{
    // res.render('recent')
    
       arr= db.query('select * from results',(err, rows,fields)=>{
            if (err)
            { 
                console.log(err);
            }
            else
            { 
                res.render('recent',{items: rows})
            }
        })
    // console.log(arr);
    // res.render('recent');
}