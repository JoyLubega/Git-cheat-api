const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandSchema = new Schema({
    command: { type: String, required: [true, "Command should not be Empty"]},
    description: { type : String},
    category:{type: Schema.Types.ObjectId, ref: "Category"},
});
const command = mongoose.model('Command', CommandSchema);

module.exports = command;