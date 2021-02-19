const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupsSchema = new Schema({
    title:{
        type:String,
        maxlength:20, ///maxlength for ui to be nice to the user
        required:[true,"forgot your group title?"]
    }, 
    // todos:[{ 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Todo' 
    // }],
    user:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    }
},
{ timestamps: { updatedAt: 'modifiedAt' }}
);

const Group = mongoose.model('Group', groupsSchema);
  
module.exports = Group