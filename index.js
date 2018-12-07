const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const middleware = require('./middleware');


const { mongoose } = require('./db.js');
const categoryController = require('./Controllers/categoryController');
const commandsController = require('./Controllers/commandsController')
const userController = require('./Controllers/userController')


const app = express();
app.use(bodyParser.json());
app.use(cors())

app.listen(process.env.PORT || 3000, ()=> console.log("Server started at port : 3000"))
  
app.use('/api',middleware.checkToken,categoryController);
app.use('/', userController);
app.use('/api/category',middleware.checkToken,commandsController);
