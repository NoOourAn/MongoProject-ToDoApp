const express = require('express');
const router = express.Router()
const User = require('../models/User')
const Todo = require('../models/Todo')
const Group = require('../models/Group')


///api to create new todo
router.post('/',async (req,res)=>{
    try {
        const {title} = req.body
        const userId = req.decodeData.id;
        if(title){
            const group = await Group.create({title,user:userId})
            const obj = {
                success:true,
                message:"group was created succesfully",
                group: group
            }
            res.send(obj)
        }else throw new Error("title is required")
    } catch (err) {
        res.json({success:false,message:err.message})
    }
})

///api to get all groups 
router.get('/',async (req, res) => {
    try {
        const userId = req.decodeData.id;
        const groups = await Group.find({user:userId})
        const obj ={
            success:true,
            groups: (groups.length? groups : []) ///if no todos return empty list
        }
        res.send(obj)
    } catch (err) {
        res.json({success:false,message:err.message})
    }
})


//  ///MANIPULATE Todo with ID
//  router.route('/:id')
//  .get(async (req,res)=>{  ///to get todo with id
//     try {
//         const {id} = req.params;
//         const userId = req.decodeData.id;
//         const todo = await Todo.findOne({ _id: id ,user: userId})
//         const obj = {
//             success:true,
//             todo:(todo)? todo: "todo not found",
//         }
//         res.send(obj);
//     } catch (error) {
//         res.json({success:false,message:err.message})
//     }
//  })
//  .delete(async(req, res) => {  ///delete todo
//     try {
//         const {id} = req.params;
//         const userId = req.decodeData.id;
//         const todo = await Todo.findOneAndDelete({_id:id,user: userId})
//         const obj = {
//             success:true,
//             message:(todo)? "todo deleted successfully": "todo not found"
//         }
//         res.send(obj)
//     } catch (err) {
//         res.json({success:false,message:err.message})
//     } 
//  })

  




module.exports = router