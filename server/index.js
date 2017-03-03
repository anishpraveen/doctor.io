// server/index.js
'use strict';
const mongoose = require("mongoose");
const app = require('./app');

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
mongoose.connect("mongodb://heroku_s949h9sb:qlac4fjj2d9rshc4b9hjqk9dlm@ds143449.mlab.com:43449/heroku_s949h9sb");