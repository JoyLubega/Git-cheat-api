const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { mongoose } = require('./db.js');
const categoryController = require('./Controllers/categoryController');
const commandsController = require('./controllers/commandsController')
const userController = require('./controllers/userController')


const app = express();
app.use(bodyParser.json());
app.use(cors())

app.listen(process.env.PORT || 3000, ()=> console.log("Server started at port : 3000"))
  
app.use('/api', categoryController);
app.use('/', userController);
app.use('/api/category', commandsController);
