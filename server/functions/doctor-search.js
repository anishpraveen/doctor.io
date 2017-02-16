module.exports = {
    insert: function (time) {

    },
    search: function (req, res, next) {
        console.log('connect')
        var mysql = require('mysql')
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'dental_io'
        })
        // var connection = require('./db.js')
        // connection.connect()
        connection.query('SELECT * FROM doctors', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            var dr = rows[0];
            var objs = [];
            for (var i = 0; i < rows.length; i++) {
                objs.push({ name: rows[i].cName, post:rows[i].cPost, experience:rows[i].iExperience });
            }
            // console.log('' + dr.cName);
            // console.log((objs))
            res.json(objs);
            // return (objs);
        });
    }
}