var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'BEDUser',    //Change accordingly
    password: 'BEDUser1!',    //Change accordingly
    database: 'snapsell'    
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id: ' + connection.threadId);
});

module.exports=connection;