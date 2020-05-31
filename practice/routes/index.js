var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user', require('./users'));
router.use('/contents', require('./contents'));
router.use('/company', require('./company'));
module.exports = router;
