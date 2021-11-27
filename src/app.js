const express = require('express')
const User = require('./config')
const mysql = require('mysql')
const app = express()
app.use(express.json())
var itr = 1;

//------------------------- with mySql database--------------------------------------

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'fans_incorporated_database'
// })

// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log("Mysql Connected...")
// })

// app.post('/v1/tasks',async(req,res)=>{
//     let sql = `insert into tasks values(${itr++},'${(req.body.title)}',default);`
//     db.query(sql,(err,res)=>{
//         if(err){
//             throw err;
//         }
//         console.log("Task Added...")
//     })
//     res.status(201).send({id : itr-1})
// })


//--------------------------with firebase database-------------------------------

app.post("/v1/tasks",async(req,res)=>{
    req.body["id"] = itr++
    req.body["is_completed"] = false
    const data = req.body
    await User.add(data)
    res.status(201).send({id : req.body.id})
})

app.get('/v1/tasks',async(req,res)=>{
    const snapshot = await User.get()
    const list = snapshot.docs.map((doc)=>doc.data())
    res.status(200).send({tasks:list})
})

app.get('/v1/tasks/:id',async(req,res)=>{

    const snapshot = await User.get()
    const list = snapshot.docs.map((doc)=>doc.data())

    const _id = req.params.id

    for(var i=0;i<list.length;i++){
        if(_id == list[i].id){
            return res.status(200).send(list[i])
        }
    }
    res.status(404).send({ error : "There is no task at that id"})
})

app.delete('/v1/tasks/:id',async(req,res)=>{
    const snapshot = await User.get()
    const list = snapshot.docs.map((doc)=>({fire_id:doc.id,...doc.data()}))

    const _id = req.params.id
    for(var i=0;i<list.length;i++){ 
        if(list[i].id == _id){
            User.doc(list[i].fire_id).delete()
            return res.status(204).send()
        }
    }
    res.status(204).send()
})

app.put('/v1/tasks/:id',async(req,res)=>{

    const snapshot = await User.get()
    const list = snapshot.docs.map((doc)=>({fire_id:doc.id,...doc.data()}))    

    const _id = req.params.id

    for(var i=0;i<list.length;i++){
        if(_id == list[i].id){
            req.body.id = req.params.id
            User.doc(list[i].fire_id).delete()
            User.add(req.body)
            return res.status(204).send()
        }
    }

    res.status(404).send({ error : "There is no task at that id"})
})

// --------------------------------- Without any database-------------------------------

//const tasks = []

// app.post('/v1/tasks',(req,res)=>{
//     req.body["id"] = itr++
//     req.body["is_completed"] = false
//     tasks.push(req.body)
//     res.status(201).send({id : req.body.id})
// })

// app.get('/v1/tasks',(req,res)=>{
//     res.status(200).send({tasks:tasks})
// })

// app.get('/v1/tasks/:id',(req,res)=>{
//     const _id = req.params.id

//     for(var i=0;i<tasks.length;i++){
//         if(_id == tasks[i].id){
//             return res.status(200).send(tasks[i])
//         }
//     }

//     res.status(404).send({ error : "There is no task at that id"})
// })

// app.delete('/v1/tasks/:id',(req,res)=>{
//     const _id = req.params.id

//     for(var i=0;i<tasks.length;i++){ 
//         if(tasks[i].id == _id){
//             tasks.splice(i,1); 
//             return res.status(204).send()
//         }
//     }
//     res.status(204).send()
// })

// app.put('/v1/tasks/:id',(req,res)=>{
//     const _id = req.params.id

//     for(var i=0;i<tasks.length;i++){
//         if(_id == tasks[i].id){
//             req.body.id = req.params.id
//             tasks[i] = req.body
//             return res.status(204).send()
//         }
//     }

//     res.status(404).send({ error : "There is no task at that id"})
// })


app.listen(5000,()=>{
    console.log('Server is listening on port 5000.')
})