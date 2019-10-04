var mysql = require('mysql')
const db=mysql.createConnection({
    user:'root',
    password:'password',
    database:'titanic',
    host:'localhost'
})

// ______________________________________________________________________

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
const port = 9000

// ______________________________________________________________________

app.use(bodyParser.json())
app.use(cors())

// ______________________________________________________________________

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome asd</h1>`)
})

app.get('/getall',(req,res)=>{
    try {
        db.query('select * from passenger',(err,result)=>{
            if(err) throw err
            res.send(result)
        })
    } catch (err) {
        res.send('Gagal')
    }
    
})

app.get('/getfilter',(req,res)=>{
    
    let sql =`select * from passenger where Name like '%${req.query.inputName}%'`   
    
    if(req.query.inputAgeMax){
       sql+=` and Age <= ${req.query.inputAgeMax}` 
    }
    if(req.query.inputAgeMin){
        sql+=` and Age >= ${req.query.inputAgeMin}` 
    }
    if(req.query.inputGender){
        sql+=` and Sex = '${req.query.inputGender}'`
    }
    if(req.query.inputSurvived){
        sql+=` and Survived = ${req.query.inputSurvived}`
    }
    if(req.query.inputClass){
        sql+=` and Pclass = ${req.query.inputClass}`
    }

    try {
        db.query(sql,(err,result)=>{
            if (err) throw err
            res.send(result)
        })
    } catch (err) {
        res.send(err)
    } 
})

app.get('/getclass',(req,res)=>{
    try {
        db.query('select distinct Pclass from passenger order by Pclass',(err,result)=>{
            if(err) throw err
            res.send(result)
        })
    } catch (err) {
        res.send(err)
    }
    
})

//_______________________________________________________________________

app.listen(port,()=>{
    console.log('listening in port '+ port +'...');
})

