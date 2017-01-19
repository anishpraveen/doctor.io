var mongoose = require('../connection');
var Schema   = mongoose.Schema;

var CommentSchema = new Schema({
    title : String,
});


var Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;