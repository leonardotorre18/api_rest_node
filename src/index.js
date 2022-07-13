const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes/index');
const path = require('path')

// settings
const port = process.env.PORT || 2000;
app.set('port', port);
app.set('json spaces', 2);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))

// routes config
routes(app)

// listener
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})