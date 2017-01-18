var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;
mongoose.connect('mongodb://localhost/dental');
module.exports = mongoose;