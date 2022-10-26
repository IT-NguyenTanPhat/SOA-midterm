var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tuitionfee', function(req, res, next) {
  res.render('tuitionFee', {title: 'test'})
})

module.exports = router;
