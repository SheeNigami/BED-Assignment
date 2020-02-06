if (process.env.NODE_ENV = 'development') {
    require('dotenv').config({path: '.env.development'});
}

var app = require('./controller/app.js');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    if (process.send) {
        process.send(process.send({ event:'online', url:'http://localhost:3301' }));
    }
    console.log("App hosted at localhost: " + PORT);
});