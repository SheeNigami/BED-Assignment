// Name: Yeo Sheen Hern 
// Admin no. : 1902257
// Class: DIT/FT/1B/11

var mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
    host: DB_HOST, 
    user: DB_USER,   
    password: DB_PASSWORD,    
    database: DB_NAME    
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id: ' + connection.threadId);
});

module.exports=connection;