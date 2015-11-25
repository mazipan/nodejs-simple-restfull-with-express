var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/test', function(req, res, next) {
  res.json({ message: 'test' });
});



module.exports = router;
