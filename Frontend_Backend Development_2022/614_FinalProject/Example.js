console.log("hello");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nunipapa2008$$',
    database: "testdb"
});

con.connect(function (err) {
    if (err) throw err;
    con.query("INSERT INTO tutorials VALUES (default,'C',true,\"TestC\")", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(result[0]);
    });
});