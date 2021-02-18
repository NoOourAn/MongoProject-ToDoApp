const express = require('express');
const router = express.Router()
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')
const mongoose = require('mongoose');


///api to create new todo
router.post('/',async (req,res)=>{
    try {
        const {title,body,group} = req.body
        const userId = req.decodeData.id;
        if(title && body){
            let todo;

            if(group && group !== 'null')
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

///api to get all Todos ///api to get todos of specific month or day(filters)
router.get('/',async (req, res) => {
    try {
        const {month,day,groupBy} = req.query;
        const userId = req.decodeData.id;
        let todos=[];
        ////to check filters (query parameters)
        if(month && day)
            todos = await getTodosInMonthAndDay(userId,month,day)

        else if(month)
            todos = await getTodosInOneMonth(userId,month)
    
        else if(day)
            todos = await getTodosInOneDay(userId,day)
            
        else if(groupBy=='day')
            todos = await groupTodosByDay(userId)
        
        else if(groupBy=='month')
            todos = await groupTodosByMonth(userId)

        else if(groupBy=='group')
            todos = await groupTodosByGroup(userId)

        else
            todos = await Todo.find({user:userId})
            
        ///create the obj of todos according to query string values
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
 });

////helper functions
///function to get user todos in specific month and day
async function getTodosInMonthAndDay(userId,month,day){
    let todos=[];
    todos = await Todo.aggregate([
        {
            $match: { 
                user: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $project: {
                title:1,
                creayedAt:1,
                modifiedAt:1,
                day: {$dayOfMonth: '$createdAt'},
                month: {$month: '$createdAt'}
            }
        },
        {
            $match: {
                month: parseInt(month),
                day: parseInt(day)
            }
        }
    ]).exec();
    return todos;
}
//////function to get todos in specific month
async function getTodosInOneMonth(userId,month){
    let todos=[]
    todos = await Todo.aggregate([
        {
            $match: { 
                user: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $project: {
                title:1,
                creayedAt:1,
                modifiedAt:1,
                month: {$month: '$createdAt'}
            }
        },
        {
            $match: {
                month: parseInt(month)
            }
        }
    ]).exec();

    return todos;
}
/////function to get todos in specific day
async function getTodosInOneDay(userId,day){
    let todos=[]
    todos = await Todo.aggregate([
        { 
            $match: { 
                user: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $project: {
                title:1,
                creayedAt:1,
                modifiedAt:1,
                day: {$dayOfMonth: '$createdAt'}
            }
        },
        {
            $match: {
                day: parseInt(day)
            }
        }
    ]).exec();

    return todos
}

/////////function to get todos grouped by day
async function groupTodosByDay(userId){
    let todos= [];
    let temp= [];
    let groups= [];
    groups = await Todo.aggregate([
        { 
            $match: { 
                user: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $group: {
                _id: {$dayOfMonth: "$createdAt"}, 
                TodosPerDay: {$sum: 1} 
            }
        }
    ]);
    for(let group of groups){
        
        temp = await Todo.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(userId) 
                }
            },
            {
                $project: {
                    title:1,
                    creayedAt:1,
                    modifiedAt:1,
                    day: {$dayOfMonth: '$createdAt'}
                }
            },
            {
                $match: {
                    day: parseInt(group._id)  ///to get the day of the current group
                }
            }
        ]).exec();
        let obj = {
            day:group._id,
            todos:temp
        }
        todos.push(obj) 
    }
    // console.log(todos)
    return todos
}
//////////function to get todos grouped by month
async function groupTodosByMonth(userId){
    let todos= [];
    let temp= [];
    let groups= [];
    groups = await Todo.aggregate([
        { 
            $match: { 
                user: new mongoose.Types.ObjectId(userId) 
            }
        },
        {
            $group: {
                _id: {$month: "$createdAt"}, 
                TodosPerMonth: {$sum: 1} 
            }
        }
    ]);
    for(let group of groups){
        
        temp = await Todo.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(userId) 
                }
            },
            {
                $project: {
                    title:1,
                    creayedAt:1,
                    modifiedAt:1,
                    month: {$month: '$createdAt'}
                }
            },
            {
                $match: {
                    month: parseInt(group._id)  ///to get the day of the current group
                }
            }
        ]).exec();
        let obj = {
            month:group._id,
            todos:temp
        }
        todos.push(obj) 
    }
    return todos;
}
//////////function to get todos grouped by group name
async function groupTodosByGroup(userId){
    let todos= [];
    let temp= [];
    let groups= [];
    groups = await Group.find({user:userId})
    for(let group of groups){
        
        temp = await Todo.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(userId),
                    group: new mongoose.Types.ObjectId(group._id) 
                }
            },
          
        ]).exec();
        let obj = {
            groupId:group._id,
            groupTitle:group.title,
            todos:temp
        }
        todos.push(obj) 
    }
    return todos;
}


module.exports = router