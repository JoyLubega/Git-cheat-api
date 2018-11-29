const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category: { type: String, required: [true, "Category should not be Empty"]},
    commands:[{type: Schema.Types.ObjectId, ref: "Command"}],
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
});
const category = mongoose.model('Category', CategorySchema);

module.exports = category;