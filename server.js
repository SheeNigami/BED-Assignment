var app = require('./controller/app.js');
var port = 3301;
var connection = require('./model/databaseConfig.js');

var server=app.listen(port, () => {
    console.log("App hosted at localhost: " + port);
});