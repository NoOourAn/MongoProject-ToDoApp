const express = require('express')
const users = require('./routes/users')
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
app.use('/api/users',users)

//error route
app.get('**', (req, res) => {
    res.render('error')
})




app.listen(port,()=>{
    console.log(`i am listening on port ${port}`)
})