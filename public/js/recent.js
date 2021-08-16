// const mysql = require('mysql');

// const db= mysql.createConnection(
//     { host: process.env.DATABASE_HOST,
//      username: process.env.DATABASE_USER,
//      password: process.env.DATABASE_PASSWORD,
//      database: process.env.DATABASE
//      });

//      db.connect();

// window.document.addEventListener("DOMContentLoaded",()=>{
//     db.query('select * from results',(err, results)=>{
//         if (err)
//         { 
//             console.log(err);
//         }
//         else
//         { 
//             results.map(function(){
//                 '<li>' + "winner:" + results.label + "time:" + results.dates + "</li>";
//             })
//         }
//     })
// })

// const results = arr;
// console.log(results);