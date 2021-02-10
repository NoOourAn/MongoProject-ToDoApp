const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: { 
        type: String ,
        required:[true,"we need username to welcome You Dear ?"], 
        unique: true,
        index: true , ////have created index cuz i will search by it
        minlength:3,
        maxlength:15
    }, 
    email: { 
        type: String,
        required:[true,"what about the email ?!"], 
        unique: true,
        index: true,
        validate: {
            validator: function(email) {
                // var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                // return emailRegex.test(email);
                var emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")
                return emailRegex.test(email)
            },
            message: "Are U trying to fool us with fake email ?"
          },
    },
    password: { 
        type: String,
        required:[true,"you r strong , you need a strong password as well !"]
    },  
    todos: [{
         type: Schema.Types.ObjectId, 
         ref: 'Todo' 
    }],
    groups: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Group' 
    }],
    loggedIn: {
        type:Boolean, 
        default:false
    },
},
{ timestamps: { updatedAt: 'modifiedAt' } ///schema options
});


///handling failed validation errors


const User = mongoose.model('User', usersSchema);
  
module.exports = User