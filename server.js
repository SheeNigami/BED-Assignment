if (process.env.NODE_ENV = 'development') {
    require('dotenv').config({path: '.env.development'});
}

var app = require('./controller/app.js');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("App hosted at localhost: " + port);
});