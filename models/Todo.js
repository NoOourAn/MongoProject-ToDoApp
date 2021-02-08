const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todosSchema = new Schema({
    title:{
        type:String,
        maxlength:20,
        required:[true,"forgot your todo title?"]
    },
    body:{
        type:String,
        maxlength:200,
        required:[true,"forgot your todo body?"]
    },
    status:{
        type:Boolean,
        default:false,
    },
    user:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    group:{
        type:Schema.Types.ObjectId, 
        ref:'Group'
    }

});

const Todo = mongoose.model('Todo', todosSchema);
  
module.exports = Todo