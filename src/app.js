const express = require('express')

const app = express()

app.use(express.json())

const tasks = []
var itr = 1;

app.post('/v1/tasks',(req,res)=>{
    req.body["id"] = itr++
    req.body["is_completed"] = false
    tasks.push(req.body)
    res.status(201).send({id : req.body.id})
})

app.get('/v1/tasks',(req,res)=>{
    res.status(200).send({tasks:tasks})
})

app.get('/v1/tasks/:id',(req,res)=>{
    const _id = req.params.id

    for(var i=0;i<tasks.length;i++){
        if(_id == tasks[i].id){
            return res.status(200).send(tasks[i])
        }
    }

    res.status(404).send({ error : "There is no task at that id"})
})

app.delete('/v1/tasks/:id',(req,res)=>{
    const _id = req.params.id

    for(var i=0;i<tasks.length;i++){ 
        if(tasks[i].id == _id){
            tasks.splice(i,1); 
            return res.status(204).send()
        }
    }
    res.status(204).send()
})

app.put('/v1/tasks/:id',(req,res)=>{
    const _id = req.params.id

    for(var i=0;i<tasks.length;i++){
        if(_id == tasks[i].id){
            req.body.id = req.params.id
            tasks[i] = req.body
            return res.status(204).send()
        }
    }

    res.status(404).send({ error : "There is no task at that id"})
})


app.listen(5000,()=>{
    console.log('Server is listening on port 5000.')
})