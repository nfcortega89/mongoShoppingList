var mongoose = require('mongoose');

// data we want to store and it's format
var ItemSchema = new mongoose.Schema({
	name: {type: String, required: true}
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;