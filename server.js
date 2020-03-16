const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
//const { mongoose } = require('./database/database');
const Article = require('./database/database');
const app = express();

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Use Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//Router
app.use('/articles', require('./routes/index'));
app.use('/', require('./routes/ii'));
// App listen
app.listen(process.env.PORT || 3000, () => {
    console.log('Running');
});