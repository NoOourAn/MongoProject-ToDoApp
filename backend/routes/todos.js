const express = require('express');
const router = express.Router()
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')


///api to create new todo
router.post('/',async (req,res)=>{
    try {
        const {title,body,group} = req.body
        const userId = req.decodeData.id;
        if(title && body){
            let todo;
            if(group)
                todo = await Todo.create({title,body,group,user:userId})
            else
                todo = await Todo.create({title,body,user:userId})
            const obj = {
                success:true,
                message:"todo was created succesfully",
                todo: todo
            }
            res.send(obj)
        }else throw new Error("title and body are required")
    } catch (err) {
        res.json({success:false,message:err.message})
    }

})

///api to get all Todos 
router.get('/',async (req, res) => {
    try {
        const userId = req.decodeData.id;
        const todos = await Todo.find({user:userId})
        const obj ={
            success:true,
            todos: (todos.length? todos : []) ///if no todos return empty list
        }
        res.send(obj)
    } catch (err) {
        res.json({success:false,message:err.message})
    }
})


 ///MANIPULATE Todo with ID
 router.route('/:id')
 .get(async (req,res)=>{  ///to get todo with id
    try {
        const {id} = req.params;
        const userId = req.decodeData.id;
        const todo = await Todo.findOne({ _id: id ,user: userId})
        const obj = {
            success:true,
            todo:(todo)? todo: "todo not found",
        }
        res.send(obj);
    } catch (error) {
        res.json({success:false,message:err.message})
    }
 })
 .delete(async(req, res) => {  ///delete todo
    try {
        const {id} = req.params;
        const userId = req.decodeData.id;
        const todo = await Todo.findOneAndDelete({_id:id,user: userId})
        const obj = {
            success:true,
            message:(todo)? "todo deleted successfully": "todo not found"
        }
        res.send(obj)
    } catch (err) {
        res.json({success:false,message:err.message})
    } 
 })
 .patch(async(req, res) => {  ///edit todo
    try {
        const {id} = req.params;
        const {title,body,group} = req.body;
        const userId = req.decodeData.id;
        const todo = await Todo.findOneAndUpdate({ _id: id ,user: userId}, {title,body,group},{returnOriginal: false})
        const obj = {
            success:true,
            message:(todo)? "todo edited successfully": "todo not found",
            todo:todo
        }
        res.send(obj);
    } catch (err) {
        res.json({success:false,message:err.message})
    }      
 })
  

/////change todo status (if false: to true // if true: to false)
router.patch('/status/:id',async(req,res)=>{  ////to change todo status from unfinished to finished
    try {
        const {id} = req.params;
        const userId = req.decodeData.id;
        let todo = await Todo.findOne({ _id: id ,user: userId})
        todo = await Todo.findOneAndUpdate({ _id: id ,user: userId}, {status:!todo.status},{returnOriginal: false})
        const obj = {
            success:true,
            message:(todo)? "todo status changed successfully": "todo not found",
            todo:todo
        }
        res.send(obj);
    } catch (err) {
        res.json({success:false,message:err.message})
    }
 })



module.exports = router