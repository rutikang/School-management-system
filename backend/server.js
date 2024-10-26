const express = require('express')
const app = express()

const cors  =require('cors')
const mysql = require('mysql2')

app.use(cors())
app.use(express.json())

// DB set up

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'kasibante',
    database:'crud'
})
//get
app.get('/', (req,res)=>{
    // res.json("Backend connected")
    const sql = 'SELECT * FROM  student '
    db.query(sql, (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
})

// post

app.post('/create', (req,res)=>{
    // res.json("Backend connected")
    const sql = 'INSERT INTO student (`Name`,`Email`) VALUES (?)'
    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(sql, [values], (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
})

//  put

app.put('/update/:id', (req,res)=>{
    // res.json("Backend connected")
    const sql = 'UPDATE student set `Name` = ?  , `Email`= ? where id = ?'
    const values = [
        req.body.name,
        req.body.email
    ]

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
})

//delete
app.delete('/delete/:id', (req,res)=>{
    // res.json("Backend connected")
    const sql = 'DELETE from student where id = ?'
   
    const id = req.params.id;

    db.query(sql, [id], (err, data)=>{
        if(err){return console.log(err)}
        res.json(data)
    })
})

app.listen(8082, ()=>{
    console.log("Server Listening")
})