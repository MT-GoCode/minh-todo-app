const express = require("express");
const todoOp = express.Router();

// todo schema
const TodoUser = require("../models/Todo");

// todoOp.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   }); 

todoOp.get("/testRoute", (req,res) => {
    res.send('Test Successful')
})

todoOp.post("/add", (req, res) => {
    TodoUser.findOneAndUpdate({user: req.body.user}, { $push: { todos: req.body.todo} }, function (err, newSet) {        if (err) res.send(err)
        else res.json(newSet) 
    })
})

todoOp.post("/delete", (req, res) => {
    TodoUser.findOneAndUpdate({user: req.body.user}, { $pull: { todos: {placer: req.body.placer}} }, function (err, newSet) {
        if (err) res.send(err)
        else res.json(newSet) 
    })
})

todoOp.post("/complete", (req, res) => {
    TodoUser.updateOne(
        {
            user: req.body.user,
            "todos.placer": req.body.placer
        },
        {
            $set: {"todos.$.completedDate": req.body.completedDate}
        }, function (err, newSet) {
            if (err) res.send(err)
            else res.json(newSet)
        })
        // {todos:{$elemMatch:{placer: req.body.placer}}.completedDate}= req.body.completedDate }
})

todoOp.post("/uncomplete", (req, res) => {
    TodoUser.updateOne(
        {
            user: req.body.user,
            "todos.placer": req.body.placer
        },
        {
            $set: {"todos.$.completedDate": null}
        }, function (err, newSet) {
            if (err) res.send(err)
            else res.json(newSet)
        })
        // {todos:{$elemMatch:{placer: req.body.placer}}.completedDate}= req.body.completedDate }
})

todoOp.get("/current/:user", (req, res) => {
    TodoUser.findOne({user: req.params.user}, function (err, user) {
        if (err) res.send(err)
        else {
            let currentTodos = []
            for (i = 0; i<user.todos.length; i++) {
                let workingTodo = user.todos[i]
                if (!workingTodo.completedDate){
                    currentTodos.push(workingTodo)
                }
            }
            res.json(currentTodos)
        }
    })
})

todoOp.get("/all/:user", (req, res) => {
    TodoUser.findOne({user: req.params.user}, function (err, user) {
        if (err) res.send(err)
        res.json(user.todos)
    })
})

module.exports = todoOp