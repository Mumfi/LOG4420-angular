var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Site de quiz Web' });
});

router.get('/templates/:template', function(req, res, next) {
    res.render('templates/' + req.params.template + ".pug");
});

module.exports = router;
