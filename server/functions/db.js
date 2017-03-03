var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'd6ybckq58s9ru745.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'by56cbaj5p899rwh',
    password: 'lccwekt3vy3ogrrr',
    database: 'dz30plhe9sxsrrbw'
})
module.exports = connection