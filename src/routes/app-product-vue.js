var express = require('express');
var router = express.Router();
const URL_ROOT = "http://localhost:3000";

router.get('/', function(req, res, next) {
    res.render('vue-app', {root: URL_ROOT});
});

module.exports = router;
