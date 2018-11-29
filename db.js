const mongoose = require('mongoose');
// mongodb://<dbuser>:<dbpassword>@ds115154.mlab.com:15154/commands
mongoose.connect('mongodb://localhost:27017/commands',(err)=>{
    if (!err)
        console.log('MongoDb connection succeedded');
    else
    console.log('Error in Db connection: ' + JSON.stringify(err, undefined,2));

});

module.exports = mongoose;