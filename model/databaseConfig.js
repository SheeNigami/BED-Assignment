var mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
    host: DB_HOST, 
    user: DB_USER,    //Change accordingly
    password: DB_PASSWORD,    //Change accordingly
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