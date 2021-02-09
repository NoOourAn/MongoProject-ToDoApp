const express = require('express')
const usersRoutes = require('./routes/users')
const todosRoutes = require('./routes/todos')
const errorRoute = require('./routes/error')
const authMiddleware = require('./middlewares/authMiddleware')
require('./db-conn')


const app = express()
const port = 3000

//set up template engine
app.set('view engine','ejs')

//set up static files
app.use(express.static('public'))  ///by default it heads for public folder

//set up json body parser
app.use(express.json());

//Users Router
app.use('/api/users',usersRoutes)

//Todos Router
app.use('/api/todos',authMiddleware,todosRoutes)  
 
//error route
app.use('**', errorRoute)




app.listen(port,()=>{
    console.log(`i am listening on port ${port}`)
})