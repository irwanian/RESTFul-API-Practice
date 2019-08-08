var mysql = require('mysql')

var db = mysql.createConnection({
    host : 'db4free.net',
    user : 'irwanian',
    password: 'ramadhanideas',
    database : 'popokkece',
    port : 3306
})

// var db = mysql.createConnection({
//     host : 'localhost',
//     user : 'irwanian',
//     password: 'ramadhanideas',
//     database : 'popokkece',
//     port : 3306
// })

module.exports = {
    db
}