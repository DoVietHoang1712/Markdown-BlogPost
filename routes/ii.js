const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
    let articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
});

module.exports = router;