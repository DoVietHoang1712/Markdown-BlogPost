const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
//const { mongoose } = require('./database/database');
const Article = require('./models/article');
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
//app.use('/', require('./routes/ii'));
app.use('/users', require('./routes/users/index'));

//Config Session
app.use(session({secret: 'secret',resave: false, saveUninitialized: false, cookie: {maxAge: 60000}}));
app.get('/', async (req, res) => {
    let sessData = req.session;
    sessData.token = req.query.token;
    //console.log(sessData.token);
    let articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
});
//App listen
app.listen(process.env.PORT || 3000, () => {
    console.log('Running');
});