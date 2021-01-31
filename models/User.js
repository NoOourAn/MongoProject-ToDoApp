// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const usersSchema = new Schema({
//     username: { type: String ,required:true, unique: true,index: true}, ////have created index cuz i will search by it
//     password: { type: String,required:true},  ///((?=.*[a-z])(?=.*[0-9]))
//     email: { type: String,required:true,minlength:3,maxlength:15},  ////match: /[a-z]/ 
//     todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
//     loggedIn: {type:Boolean, default:false}
// });

// const User = mongoose.model('User', usersSchema);
  
// module.exports = User