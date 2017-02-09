// server/index.js
'use strict';
var mongoose = require("mongoose");
const app = require('./app');

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
mongoose.connect("mongodb://localhost/dental");